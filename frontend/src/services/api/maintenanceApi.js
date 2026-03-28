import http from "./http";

// Resident
export const createRequest       = (token, data)         => http("/api/maintenance",                    token, { method: "POST", body: data });
export const getMyRequests       = (token)               => http("/api/maintenance/my",                 token);
export const deleteRequest       = (token, id)           => http(`/api/maintenance/${id}`,              token, { method: "DELETE" });

// Landlord
export const getPropertyRequests = (token, propertyId)   => http(`/api/maintenance/property/${propertyId}`, token);
export const updateStatus        = (token, id, status)   => http(`/api/maintenance/${id}/status`,       token, { method: "PATCH", body: { status } });



