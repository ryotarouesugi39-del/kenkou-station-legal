import type { Metadata } from "next";
import { getApp } from "@/config/apps";
import KenkouStationView from "./KenkouStationView";
import TikTokPixel from "../../_components/TikTokPixel";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: app.name,
};

export default function KenkouStationPage() {
  return (
    <>
      <KenkouStationView />
      <TikTokPixel />
    </>
  );
}
