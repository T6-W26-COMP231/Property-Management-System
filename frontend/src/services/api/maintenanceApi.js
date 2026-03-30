import http from "./http";

// Resident
export const createRequest        = (token, data)           => http("/api/maintenance",                       token, { method: "POST",  body: data });
export const getMyRequests        = (token)                  => http("/api/maintenance/my",                   token);
export const deleteRequest        = (token, id)              => http(`/api/maintenance/${id}`,                token, { method: "DELETE" });

// Landlord
export const getPropertyRequests  = (token, propertyId)     => http(`/api/maintenance/property/${propertyId}`,token);
export const updateStatus         = (token, id, status)      => http(`/api/maintenance/${id}/status`,         token, { method: "PATCH", body: { status } });
export const searchContractors    = (token, filters = {})   => {
  const params = new URLSearchParams(filters).toString();
  return http(`/api/maintenance/contractors${params ? `?${params}` : ""}`, token);
};
export const assignContractor     = (token, id, contractorId) => http(`/api/maintenance/${id}/assign`,    token, { method: "PATCH", body: { contractorId } });
export const unassignContractor   = (token, id)               => http(`/api/maintenance/${id}/unassign`,  token, { method: "PATCH" });

// Contractor
export const respondToAssignment  = (token, id, response)   => http(`/api/maintenance/${id}/respond`,        token, { method: "PATCH", body: { response } });
