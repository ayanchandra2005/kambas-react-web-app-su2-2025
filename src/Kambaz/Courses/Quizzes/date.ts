// src/Kambaz/Courses/Quizzes/date.ts

/**
 * Formats a date string into a nice display like:
 * "February 10 at 11:59 PM"
 */
export function formatDateTime(dateString?: string) {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  }
  
  /**
   * Returns quiz availability status:
   * - "Closed"
   * - "Available"
   * - "Not available until <date>"
   */
  export function getAvailabilityStatus(
    availableFrom?: string,
    availableUntil?: string
  ): string {
    const now = new Date();
    const from = availableFrom ? new Date(availableFrom) : undefined;
    const until = availableUntil ? new Date(availableUntil) : undefined;
  
    if (until && now > until) {
      return "Closed";
    }
    if (from && now < from) {
      return `Not available until ${formatDateTime(availableFrom)}`;
    }
    if (from && (!until || now <= until)) {
      return "Available";
    }
    return "Available"; // default fallback
  }
  
  /**
   * Returns the ✅ (published) or 🚫 (unpublished) symbol
   */
  export function getPublishIcon(published: boolean): string {
    return published ? "✅" : "🚫";
  }