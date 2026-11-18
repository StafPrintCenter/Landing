import { describe, it, expect } from "vitest";
import { generateTrackingCode } from "./ethique";
describe("generateTrackingCode", () => {
  it("formats SPC-SEC-XXXX", () => {
    expect(generateTrackingCode(() => 0)).toBe("SPC-SEC-1000");
    expect(generateTrackingCode(() => 0.9999)).toBe("SPC-SEC-9999");
  });
});
