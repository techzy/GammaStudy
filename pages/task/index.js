import Link from "next/link";
import Head from "next/head";

export default function Sample() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
      </Head>
      <div className="text-center">
        <h1>Study</h1>
        <div className="d-flex justify-content-center align-items-center">
          <input className="form-control me-2" type="text" placeholder="Enter Topic" />
          <input className="form-control me-2" type="number" placeholder="Duration (min)" />
          <button className="btn btn-primary">
            <Link href="/graph" className="text-white text-decoration-none">
              Study
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
