export const ROUTES = {
  TEMPLATE_ID: (templateId: string) => `/builder/${templateId}`,
  PREVIEW_TEMPLATE_ID: (templateId: string) => `/builder/${templateId}/preview`,
};

export const API_ROUTES = {
  DOWNLOAD_TEMPLATE_ID: (templateId: string) => `/api/generate/${templateId}`,
  PUBLISH_TEMPLATE: (templateId: string) => `/api/publish/${templateId}`,
};
