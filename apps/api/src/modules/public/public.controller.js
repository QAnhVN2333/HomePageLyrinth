import { getHealthInfo } from './public.service.js'

export function createPublicController(port) {
  return {
    health(_request, response) {
      response.status(200).json(getHealthInfo(port))
    },
  }
}

