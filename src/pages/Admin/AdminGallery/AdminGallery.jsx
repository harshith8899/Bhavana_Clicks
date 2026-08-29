import { useEffect, useRef, useState } from "react";
import {
  POST_SECTIONS,
  getPostsBySection,
  createPost,
  updatePost,
  deletePost,
} from "../../../services/postsService";
import { buildResponsiveImageUrl } from "../../../services/mediaService";
import { isCloudinaryUploadConfigured } from "../../../services/cloudinaryService";
import "./AdminGallery.css";

const MAX_FILE_SIZE_MB = 15;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateFile(file, { required }) {
  if (!file) return required ? "Please choose an image." : null;
  if (!ACCEPTED_TYPES.includes(file.type)) return "Please choose a JPG, PNG, or WEBP image.";
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return `Please choose an image smaller than ${MAX_FILE_SIZE_MB}MB.`;
  return null;
}

const EMPTY_FORM = { title: "", category: "", location: "" };

function PostForm({ initial, requireFile, busy, onCancel, onSubmit }) {
  const fileInputRef = useRef(null);
  const [fields, setFields] = useState(initial || EMPTY_FORM);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const msg = validateFile(f, { required: requireFile });
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.title.trim()) {
      setError("Please enter a title.");
      return;
    }
    const fileMsg = validateFile(file, { required: requireFile });
    if (fileMsg) {
      setError(fileMsg);
      return;
    }
    setError(null);
    onSubmit({ ...fields, file });
  };

  return (
    <form className="admin-gallery__form" onSubmit={handleSubmit}>
      <div className="admin-gallery__form-grid">
        <div className="admin-gallery__field">
          <label>Title *</label>
          <input
            type="text"
            value={fields.title}
            onChange={(e) => setFields((p) => ({ ...p, title: e.target.value }))}
            placeholder="Meera & Arjun"
          />
        </div>
        <div className="admin-gallery__field">
          <label>Category</label>
          <input
            type="text"
            value={fields.category}
            onChange={(e) => setFields((p) => ({ ...p, category: e.target.value }))}
            placeholder="Elopements / Weddings"
          />
        </div>
        <div className="admin-gallery__field">
          <label>Location / Subtitle</label>
          <input
            type="text"
            value={fields.location}
            onChange={(e) => setFields((p) => ({ ...p, location: e.target.value }))}
            placeholder="Coorg Forest Elopement"
          />
        </div>
      </div>

      <div className="admin-gallery__field">
        <label>{requireFile ? "Photo *" : "Photo (leave blank to keep current)"}</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div className="admin-gallery__form-preview">
            <img src={previewUrl} alt="Selected preview" />
          </div>
        )}
      </div>

      {error && <p className="admin-gallery__error">{error}</p>}

      <div className="admin-gallery__form-actions">
        <button type="button" className="btn btn--text" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="submit" className="btn btn--solid" disabled={busy}>
          {busy ? "Saving..." : "Save Post"}
        </button>
      </div>
    </form>
  );
}

function PostCard({ post, onEdit, onDeleted }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const thumbUrl = buildResponsiveImageUrl(post.imageUrl, { width: 300 });

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setError(null);
    try {
      await deletePost(post.id);
      onDeleted();
    } catch (err) {
      console.error(`Failed to delete post ${post.id}:`, err);
      setError("We couldn't delete this post right now. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="admin-gallery__card">
      <div className="admin-gallery__card-img">
        <img src={thumbUrl} alt={post.title} />
      </div>
      <p className="admin-gallery__card-category">{post.category || "—"}</p>
      <h3>{post.title}</h3>
      {post.location && <p className="admin-gallery__card-location">{post.location}</p>}

      {error && <p className="admin-gallery__error">{error}</p>}

      {confirmingDelete ? (
        <div className="admin-gallery__confirm">
          <p>Delete this post?</p>
          <div className="admin-gallery__card-actions">
            <button type="button" className="btn btn--text" onClick={() => setConfirmingDelete(false)} disabled={deleting}>
              Cancel
            </button>
            <button type="button" className="admin-gallery__delete-confirm" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-gallery__card-actions">
          <button type="button" className="btn btn--outline admin-gallery__edit" onClick={onEdit}>
            Edit
          </button>
          <button type="button" className="admin-gallery__delete" onClick={() => setConfirmingDelete(true)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminGallery() {
  const [section, setSection] = useState(POST_SECTIONS[0].value);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setShowAddForm(false);
    setEditingId(null);
    getPostsBySection(section)
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        if (!cancelled) setLoadError("Unable to load posts. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [section, reloadToken]);

  const handleAdd = async (fields) => {
    if (!isCloudinaryUploadConfigured()) {
      setSaveError("Image upload isn't configured yet. Ask your developer to finish the Cloudinary setup.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await createPost(section, fields);
      setShowAddForm(false);
      setReloadToken((t) => t + 1);
    } catch (err) {
      console.error("Failed to create post:", err);
      setSaveError("We couldn't save this post right now. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (postId, fields) => {
    setSaving(true);
    setSaveError(null);
    try {
      await updatePost(postId, fields);
      setEditingId(null);
      setReloadToken((t) => t + 1);
    } catch (err) {
      console.error(`Failed to update post ${postId}:`, err);
      setSaveError("We couldn't save these changes right now. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const editingPost = posts.find((p) => p.id === editingId);

  return (
    <div className="admin-gallery">
      <span className="section-kicker">admin</span>
      <h1 className="admin-gallery__title">Gallery</h1>
      <p className="admin-gallery__subtitle">
        Add, edit, or remove the posts shown in the Home featured strip, Weddings, Couples, and Elopement Guides pages.
      </p>

      {!isCloudinaryUploadConfigured() && (
        <p className="admin-gallery__notice">
          Image upload isn't configured yet in this environment — you can browse existing posts, but adding or
          replacing photos isn't available until Cloudinary is connected.
        </p>
      )}

      <div className="admin-gallery__tabs">
        {POST_SECTIONS.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`admin-gallery__tab ${section === s.value ? "admin-gallery__tab--active" : ""}`}
            onClick={() => setSection(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {!showAddForm && !editingId && (
        <button type="button" className="btn btn--solid admin-gallery__add-btn" onClick={() => setShowAddForm(true)}>
          + Add New Post
        </button>
      )}

      {saveError && <p className="admin-gallery__error">{saveError}</p>}

      {showAddForm && (
        <div className="admin-gallery__form-panel">
          <h2>New Post</h2>
          <PostForm
            requireFile
            busy={saving}
            onCancel={() => {
              setShowAddForm(false);
              setSaveError(null);
            }}
            onSubmit={handleAdd}
          />
        </div>
      )}

      {editingPost && (
        <div className="admin-gallery__form-panel">
          <h2>Edit Post</h2>
          <PostForm
            initial={{ title: editingPost.title, category: editingPost.category, location: editingPost.location }}
            requireFile={false}
            busy={saving}
            onCancel={() => {
              setEditingId(null);
              setSaveError(null);
            }}
            onSubmit={(fields) => handleEdit(editingPost.id, fields)}
          />
        </div>
      )}

      {loading && <p className="admin-gallery__state">Loading posts...</p>}
      {!loading && loadError && <p className="admin-gallery__state admin-gallery__state--error">{loadError}</p>}
      {!loading && !loadError && posts.length === 0 && (
        <p className="admin-gallery__state">No posts yet in this section.</p>
      )}

      {!loading && !loadError && posts.length > 0 && (
        <div className="admin-gallery__grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => {
                setEditingId(post.id);
                setShowAddForm(false);
                setSaveError(null);
              }}
              onDeleted={() => setReloadToken((t) => t + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
