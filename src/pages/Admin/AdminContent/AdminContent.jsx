import { useEffect, useRef, useState } from "react";
import {
  WEBSITE_IMAGE_SLOTS,
  getWebsiteImagesBySection,
  buildResponsiveImageUrl,
  replaceWebsiteImage,
  removeWebsiteImage,
  isCloudinaryUploadConfigured,
} from "../../../services/mediaService";
import "./AdminContent.css";

const MAX_FILE_SIZE_MB = 15;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateFile(file) {
  if (!file) return "Please choose an image.";
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Please choose a JPG, PNG, or WEBP image.";
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `Please choose an image smaller than ${MAX_FILE_SIZE_MB}MB.`;
  }
  return null;
}

function dimensionsLabel(currentImage) {
  if (!currentImage?.width || !currentImage?.height) return null;
  const { width, height } = currentImage;
  const orientation = width === height ? "Square" : width > height ? "Landscape" : "Portrait";
  return `${orientation} · ${width} × ${height}`;
}

function SlotCard({ slot, currentImage, onReplaced, onRemoved }) {
  const fileInputRef = useRef(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | saving | removing | error
  const [error, setError] = useState(null);
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  const currentUrl = currentImage?.imageUrl
    ? buildResponsiveImageUrl(currentImage.imageUrl, { width: 400 })
    : null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationMsg = validateFile(file);
    if (validationMsg) {
      setValidationError(validationMsg);
      setPreviewFile(null);
      setPreviewUrl(null);
      return;
    }

    setValidationError(null);
    setError(null);
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setPreviewFile(null);
    setPreviewUrl(null);
    setValidationError(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReplace = async () => {
    if (!previewFile || status === "uploading" || status === "saving") return;

    if (!isCloudinaryUploadConfigured()) {
      setStatus("error");
      setError("Image upload isn't configured yet. Ask your developer to finish the Cloudinary setup.");
      return;
    }

    setStatus("uploading");
    setError(null);
    try {
      await replaceWebsiteImage(slot.section, slot.position, previewFile);
      setStatus("idle");
      handleCancel();
      onReplaced();
    } catch (err) {
      console.error(`Failed to replace ${slot.section}.${slot.position}:`, err);
      setStatus("error");
      setError("We couldn't replace this image right now. Please try again.");
    }
  };

  const handleRemoveConfirmed = async () => {
    if (status === "removing") return;
    setStatus("removing");
    setError(null);
    try {
      await removeWebsiteImage(slot.section, slot.position);
      setStatus("idle");
      setConfirmingRemove(false);
      onRemoved();
    } catch (err) {
      console.error(`Failed to remove ${slot.section}.${slot.position}:`, err);
      setStatus("error");
      setError("We couldn't remove this image right now. Please try again.");
      // Deliberately does NOT close the confirmation or change what's
      // displayed — the image stays active/shown until removal actually
      // succeeds, never optimistically.
    }
  };

  const busy = status === "uploading" || status === "saving" || status === "removing";
  const dims = dimensionsLabel(currentImage);

  return (
    <div className="admin-media__card">
      <h3>{slot.label}</h3>

      <div className="admin-media__preview">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected preview" />
        ) : currentUrl ? (
          <img src={currentUrl} alt={currentImage?.altText || slot.label} />
        ) : (
          <div className="admin-media__preview-empty">No image set</div>
        )}
      </div>

      {dims && !previewUrl && <p className="admin-media__dimensions">{dims}</p>}

      {validationError && <p className="admin-media__error">{validationError}</p>}
      {error && <p className="admin-media__error">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="admin-media__file-input"
        id={`file-${slot.section}-${slot.position}`}
      />

      {previewFile ? (
        <div className="admin-media__actions">
          <button type="button" className="btn btn--text" onClick={handleCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn--solid" onClick={handleReplace} disabled={busy}>
            {status === "uploading" ? "Uploading..." : status === "saving" ? "Saving..." : "Confirm Replace"}
          </button>
        </div>
      ) : confirmingRemove ? (
        <div className="admin-media__confirm">
          <p>Remove this image from the website?</p>
          <div className="admin-media__actions">
            <button
              type="button"
              className="btn btn--text"
              onClick={() => setConfirmingRemove(false)}
              disabled={busy}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--solid admin-media__remove-confirm"
              onClick={handleRemoveConfirmed}
              disabled={busy}
            >
              {status === "removing" ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-media__idle-actions">
          <label htmlFor={`file-${slot.section}-${slot.position}`} className="btn btn--outline admin-media__choose">
            {currentUrl ? "Replace Image" : "Upload Image"}
          </label>
          {currentUrl && (
            <button
              type="button"
              className="admin-media__remove"
              onClick={() => setConfirmingRemove(true)}
            >
              Remove image
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminContent() {
  const [imagesBySection, setImagesBySection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sections = [...new Set(WEBSITE_IMAGE_SLOTS.map((s) => s.section))];
        const results = {};
        for (const section of sections) {
          results[section] = await getWebsiteImagesBySection(section);
        }
        if (!cancelled) setImagesBySection(results);
      } catch (err) {
        console.error("Failed to load website images:", err);
        if (!cancelled) setError("Unable to load website images. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const sections = [...new Set(WEBSITE_IMAGE_SLOTS.map((s) => s.section))];

  return (
    <div className="admin-media">
      <span className="section-kicker">admin</span>
      <h1 className="admin-media__title">Website Content</h1>

      {!isCloudinaryUploadConfigured() && (
        <p className="admin-media__notice">
          Image upload isn't configured yet in this environment — you can preview the media library below, but
          replacing an image isn't available until Cloudinary is connected.
        </p>
      )}

      {loading && <p className="admin-media__state">Loading website images...</p>}
      {!loading && error && <p className="admin-media__state admin-media__state--error">{error}</p>}

      {!loading &&
        !error &&
        sections.map((section) => (
          <section key={section} className="admin-media__section">
            <h2 className="admin-media__section-title">{section}</h2>
            <div className="admin-media__grid">
              {WEBSITE_IMAGE_SLOTS.filter((s) => s.section === section).map((slot) => (
                <SlotCard
                  key={`${slot.section}.${slot.position}`}
                  slot={slot}
                  currentImage={imagesBySection[section]?.[slot.position]}
                  onReplaced={() => setReloadToken((t) => t + 1)}
                  onRemoved={() => setReloadToken((t) => t + 1)}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
