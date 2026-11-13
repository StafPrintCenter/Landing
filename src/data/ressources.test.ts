import { describe, expect, it } from "vitest";
import { CATEGORY_ICONS, RESOURCES, formatResourcePrice, getDiscountPercent, getResourceIcon, getResourceStatus } from "./resources";

describe("ressources", () => {
  it("affiche Gratuit uniquement pour une ressource à zéro franc", () => {
    expect(formatResourcePrice(0)).toBe("Gratuit");
  });

  it("affiche le prix d'une ressource payante en FCFA", () => {
    expect(formatResourcePrice(2500)).toBe("2 500 FCFA");
  });

  it("propose des ressources gratuites et payantes", () => {
    expect(RESOURCES.some((resource) => resource.price === 0)).toBe(true);
    expect(RESOURCES.some((resource) => resource.price > 0)).toBe(true);
  });

  it("calcule -40% pour 3 000 au lieu de 5 000 FCFA", () => {
    expect(getDiscountPercent({ price: 3000, originalPrice: 5000 })).toBe(40);
  });

  it("n'affiche pas de remise sans promotion ou si gratuit", () => {
    expect(getDiscountPercent({ price: 5000 })).toBeNull();
    expect(getDiscountPercent({ price: 0, originalPrice: 5000 })).toBeNull();
    expect(getDiscountPercent({ price: 5000, originalPrice: 3000 })).toBeNull();
  });

  it("applique l'icône de la catégorie par défaut", () => {
    expect(getResourceIcon({ category: "Guide" })).toBe(CATEGORY_ICONS.Guide);
  });

  it("utilise Prêt à l'emploi comme statut par défaut", () => {
    expect(getResourceStatus({})).toBe("Prêt à l'emploi");
    expect(getResourceStatus({ status: "Nouveauté 2026" })).toBe("Nouveauté 2026");
  });
});
