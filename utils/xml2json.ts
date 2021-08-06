export async function XML2JSON(xml: string) {
  const urlBaseXML2JS = import.meta.env.VITE_API_XML2JS;
  const urlXML2JS = urlBaseXML2JS + encodeURIComponent(xml);

  const responseJSON = await fetch(urlXML2JS);
  return await responseJSON.json();
}
