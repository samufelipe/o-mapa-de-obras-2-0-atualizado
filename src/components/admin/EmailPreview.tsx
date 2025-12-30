import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmailConfig {
  headerImageUrl: string;
  whatsappGroupUrl: string;
  zoomLink: string;
  apostilaLink: string;
}

interface EmailPreviewProps {
  html: string;
  config: EmailConfig;
}

export function EmailPreview({ html, config }: EmailPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const applyConfig = (content: string): string => {
    return content
      .replace(/HEADER_IMAGE_URL/g, config.headerImageUrl || "HEADER_IMAGE_URL")
      .replace(/WHATSAPP_GROUP_URL/g, config.whatsappGroupUrl || "WHATSAPP_GROUP_URL")
      .replace(/ZOOM_LINK/g, config.zoomLink || "ZOOM_LINK")
      .replace(/LINK_DA_APOSTILA/g, config.apostilaLink || "LINK_DA_APOSTILA");
  };

  const processedHtml = applyConfig(html);

  return (
    <div className="space-y-3">
      {/* Toggle de visualização */}
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={viewMode === "desktop" ? "default" : "outline"}
          onClick={() => setViewMode("desktop")}
          className="gap-2"
        >
          <Monitor className="h-4 w-4" />
          Desktop
        </Button>
        <Button
          size="sm"
          variant={viewMode === "mobile" ? "default" : "outline"}
          onClick={() => setViewMode("mobile")}
          className="gap-2"
        >
          <Smartphone className="h-4 w-4" />
          Mobile
        </Button>
      </div>

      {/* Preview Container */}
      <div className="flex justify-center">
        <div
          className={cn(
            "border rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300",
            viewMode === "mobile" ? "w-[375px]" : "w-full max-w-[650px]"
          )}
        >
          {viewMode === "mobile" ? (
            <div className="relative">
              {/* Notch simulado */}
              <div className="h-6 bg-zinc-900 flex items-center justify-center">
                <div className="w-20 h-4 bg-black rounded-b-xl" />
              </div>
              <iframe
                srcDoc={processedHtml}
                className="w-full bg-white"
                style={{ height: "600px" }}
                title="Preview Mobile"
              />
            </div>
          ) : (
            <iframe
              srcDoc={processedHtml}
              className="w-full bg-white"
              style={{ height: "600px" }}
              title="Preview Desktop"
            />
          )}
        </div>
      </div>
    </div>
  );
}
