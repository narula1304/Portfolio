import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Root OG image. Uses system fonts only (no next/font/google fetch) since
 * this route renders independently of the page tree and doesn't need to
 * match the site's exact typography — keeping it dependency-free is more
 * reliable than fetching custom font files at request time.
 */
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #14161a 0%, #1c1420 100%)",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -80,
                        left: 120,
                        width: 420,
                        height: 420,
                        borderRadius: "50%",
                        background: "rgba(79, 110, 247, 0.35)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -100,
                        right: 100,
                        width: 380,
                        height: 380,
                        borderRadius: "50%",
                        background: "rgba(168, 85, 247, 0.3)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: -2,
                        zIndex: 1,
                    }}
                >
                    {siteConfig.name}
                </div>
                <div
                    style={{
                        fontSize: 30,
                        color: "rgba(255,255,255,0.7)",
                        marginTop: 16,
                        zIndex: 1,
                    }}
                >
                    {profile.role}
                </div>
            </div>
        ),
        { ...size }
    );
}