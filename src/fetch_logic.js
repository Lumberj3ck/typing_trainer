import { site_url } from './config'


async function fetch_from_server(url){
  return await fetch(url, {
    method: 'GET',
    headers: { 
    'Content-Type': 'application/json' 
    }
  })
}

async function handle_fetch(url){
  let resp = await fetch_from_server(url);
  return resp.json()
}


async function get_lang_list(){
  const url = `${site_url}/api/v1/levels/languages/`
  return handle_fetch(url)
}

async function get_level(lvl_id) {
  const url = `${site_url}/api/v1/levels/${lvl_id}/`
  return handle_fetch(url)
}

async function get_levels_list() {
  const url = `${site_url}/api/v1/levels/`
  return handle_fetch(url)
}
async function get_levels_list_by_lang(lang_id) {
  const url = `${site_url}/api/v1/levels/?language=${lang_id}`
  return handle_fetch(url)
}

async function get_next_level(lvl_id, lang_code) {
  // const url = `${site_url}/api/v1/levels/next/${lvl_id}/`
  const url = `${site_url}/api/v1/levels/next/?level_id=${lvl_id}&lang_code=${lang_code}/`
  return handle_fetch(url)
}

export { get_level, get_levels_list, get_next_level, get_levels_list_by_lang, get_lang_list}