import { site_url } from './config'

async function get_level(lvl_id) {
  const url = `${site_url}/api/v1/levels/${lvl_id}/`
  let response = await fetch(url, {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json' 
    }
  })
  return response.json()
}

async function get_levels_list() {
  const url = `${site_url}/api/v1/levels/`
  let response = await fetch(url, {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json' 
    }
  })
  return response.json()
}

async function get_next_level(lvl_id) {
  const url = `${site_url}/api/v1/levels/next/${lvl_id}/`
  let response = await fetch(url, {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json' 
    }
  })
  return response.json()
}

export { get_level, get_levels_list, get_next_level}