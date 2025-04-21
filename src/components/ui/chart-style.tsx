
import * as React from "react";
import { ChartConfig, THEMES } from "./chart-helpers";

type ChartStyleProps = { id: string; config: ChartConfig };

export const ChartStyle = ({ id, config }: ChartStyleProps) => {
  const colorConfig = Object.entries(config).filter(
    ([_, itemConfig]) => (itemConfig as any).theme || (itemConfig as any).color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      (itemConfig as any).theme?.[theme as keyof typeof (itemConfig as any).theme] ||
      (itemConfig as any).color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};
