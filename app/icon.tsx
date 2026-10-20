import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "#176B65",
        }}
      >
        <svg
          viewBox="0 0 360 360"
          width="24"
          height="24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M67 84H116L180 217L244 84H293L180 318L67 84Z" />
          <path d="M144 84H194L293 276V318L244 318L144 117V84Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
