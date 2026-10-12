/** Deep links that open one ticket in Approvals or one order's details on the Orders board. */
export const ticketHref = (id: string) => `/app/approvals?t=${encodeURIComponent(id)}`;
export const orderHref = (id: string) => `/app/orders?o=${encodeURIComponent(id)}`;
