import { useEffect, useState } from "react";
import { ENQUIRY_STATUSES, getEnquiries, updateEnquiryStatus } from "../../../services/enquiryService";
import "./AdminEnquiries.css";

const STATUS_LABELS = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  archived: "Archived",
};

function formatSubmitted(createdAt) {
  if (!createdAt || typeof createdAt.toDate !== "function") return "Unknown date";
  return createdAt.toDate().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [savingIds, setSavingIds] = useState({});
  const [statusErrors, setStatusErrors] = useState({});

  const handleStatusChange = async (enquiryId, newStatus) => {
    if (savingIds[enquiryId]) return;

    setSavingIds((prev) => ({ ...prev, [enquiryId]: true }));
    setStatusErrors((prev) => ({ ...prev, [enquiryId]: null }));

    try {
      await updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("Failed to update enquiry status:", err);
      setStatusErrors((prev) => ({
        ...prev,
        [enquiryId]: "Unable to update the enquiry status. Please try again.",
      }));
    } finally {
      setSavingIds((prev) => ({ ...prev, [enquiryId]: false }));
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getEnquiries();
        if (!cancelled) setEnquiries(data);
      } catch (err) {
        console.error("Failed to load enquiries:", err);
        if (!cancelled) setError("Unable to load enquiries. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="admin-enquiries">
      <span className="section-kicker">admin</span>
      <h1 className="admin-enquiries__title">Enquiries</h1>

      {loading && (
        <p className="admin-enquiries__state">Loading enquiries...</p>
      )}

      {!loading && error && (
        <p className="admin-enquiries__state admin-enquiries__state--error">{error}</p>
      )}

      {!loading && !error && enquiries.length === 0 && (
        <p className="admin-enquiries__state">No enquiries yet.</p>
      )}

      {!loading && !error && enquiries.length > 0 && (
        <div className="admin-enquiries__list">
          {enquiries.map((enq) => {
            const isOpen = openId === enq.id;
            return (
              <div key={enq.id} className={`admin-enquiries__row ${isOpen ? "admin-enquiries__row--open" : ""}`}>
                <button
                  type="button"
                  className="admin-enquiries__summary"
                  onClick={() => setOpenId(isOpen ? null : enq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="admin-enquiries__summary-main">
                    <span className="admin-enquiries__name">{enq.name}</span>
                    <span className="admin-enquiries__contact">
                      {enq.email && <span>{enq.email}</span>}
                      {enq.phone && <span>{enq.phone}</span>}
                    </span>
                  </span>
                  <span className="admin-enquiries__event">{enq.event || "—"}</span>
                  <span className="admin-enquiries__date">{enq.date || "—"}</span>
                  <span className={`admin-enquiries__status admin-enquiries__status--${enq.status}`}>
                    {STATUS_LABELS[enq.status] || enq.status}
                  </span>
                  <span className="admin-enquiries__toggle">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="admin-enquiries__detail">
                    <dl className="admin-enquiries__detail-grid">
                      <div>
                        <dt>Email</dt>
                        <dd>{enq.email ? <a href={`mailto:${enq.email}`}>{enq.email}</a> : "—"}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{enq.phone ? <a href={`tel:${enq.phone}`}>{enq.phone}</a> : "—"}</dd>
                      </div>
                      <div>
                        <dt>Event Date</dt>
                        <dd>{enq.date || "—"}</dd>
                      </div>
                      <div>
                        <dt>Event Type</dt>
                        <dd>{enq.event || "—"}</dd>
                      </div>
                      <div>
                        <dt>Package</dt>
                        <dd>{enq.package || "—"}</dd>
                      </div>
                      <div>
                        <dt>Submitted</dt>
                        <dd>{formatSubmitted(enq.createdAt)}</dd>
                      </div>
                    </dl>
                    <div className="admin-enquiries__message">
                      <p className="admin-enquiries__message-label">Message</p>
                      <p>{enq.message || "—"}</p>
                    </div>

                    <div className="admin-enquiries__status-control">
                      <label htmlFor={`status-${enq.id}`}>Status</label>
                      <select
                        id={`status-${enq.id}`}
                        value={enq.status}
                        disabled={!!savingIds[enq.id]}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      >
                        {ENQUIRY_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                      {savingIds[enq.id] && (
                        <span className="admin-enquiries__status-saving">Saving...</span>
                      )}
                      {statusErrors[enq.id] && (
                        <p className="admin-enquiries__status-error">{statusErrors[enq.id]}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
