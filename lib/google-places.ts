// Google Places Autocomplete helper
// Uses NEXT_PUBLIC_GOOGLE_PLACES_API_KEY for client-side loading

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-script";

export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("SSR");

    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existing) {
      if ((window as unknown as { google?: { maps?: unknown } }).google?.maps) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
      }
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn("Google Places API key not configured");
      return reject("No API key");
    }

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load Google Maps");
    document.head.appendChild(script);
  });
}

export interface PlaceResult {
  name: string;
  placeId: string;
  formattedAddress: string;
  website?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  city?: string;
  state?: string;
  country?: string;
}

export function extractPlaceDetails(
  place: google.maps.places.PlaceResult
): PlaceResult {
  const addressComponents = place.address_components || [];
  let city = "";
  let state = "";
  let country = "";

  for (const comp of addressComponents) {
    if (comp.types.includes("locality")) city = comp.long_name;
    if (comp.types.includes("administrative_area_level_1")) state = comp.short_name;
    if (comp.types.includes("country")) country = comp.short_name;
  }

  return {
    name: place.name || "",
    placeId: place.place_id || "",
    formattedAddress: place.formatted_address || "",
    website: place.website || undefined,
    phone: place.formatted_phone_number || undefined,
    lat: place.geometry?.location?.lat(),
    lng: place.geometry?.location?.lng(),
    city,
    state,
    country,
  };
}
