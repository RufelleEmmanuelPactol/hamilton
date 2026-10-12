/** Deep links that open one ticket in Approvals or one order's details on the Orders board. */
export const ticketHref = (id: string) => `/console/approvals?t=${encodeURIComponent(id)}`;
export const orderHref = (id: string) => `/console/orders?o=${encodeURIComponent(id)}`;
