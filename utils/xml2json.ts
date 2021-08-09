export async function xml2json(xml: string) {
  const urlBaseXML2JS = import.meta.env.VITE_API_XML2JS;
  const urlXML2JS = urlBaseXML2JS + encodeURIComponent(xml);

  const responseJSON = await fetch(urlXML2JS, { mode: 'cors' });
  return await responseJSON.json();
}
