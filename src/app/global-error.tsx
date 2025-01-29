"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  console.log({ error });
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <pre>{error.stack}</pre>
        {error.digest && <p>Error digest: {error.digest}</p>}
        {JSON.stringify(error, null, 2)}
      </body>
    </html>
  );
}
