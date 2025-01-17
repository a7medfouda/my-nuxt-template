export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const url = query.url as string;
    
    if (!url) {
      throw createError({
        statusCode: 400,
        message: 'URL parameter is required'
      });
    }

    // Log the URL for debugging
    console.log('Downloading from:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: 'Failed to fetch file'
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    
    // Set headers
    setHeader(event, 'Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    setHeader(event, 'Content-Disposition', `attachment; filename="${url.split('/').pop()}"`);
    
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Download error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to process download'
    });
  }
});