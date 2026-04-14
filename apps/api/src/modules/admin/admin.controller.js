import { getAdminSummary } from './admin.service.js'

export const adminController = {
  summary(_request, response) {
    response.status(200).json(getAdminSummary())
  },
}

