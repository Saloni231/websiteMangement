import { create } from "zustand";

export type countryType = {
  name: string;
  language: string;
  flag: string;
};

interface CountryStore {
  countries: countryType[];
  isLoading: boolean;
  fetchCountries: () => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  isLoading: true,
  fetchCountries: async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,languages,flags"
      );
      const data = await res.json();

      const countryArr: countryType[] = [];

      if (data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((country: any) => {
          const languages = Object.values(country.languages);
          if (languages.length > 1) {
            for (const lang of languages) {
              countryArr.push({
                language: typeof lang === "string" ? lang : String(lang),
                flag: country?.flags?.png || "",
                name: country?.name?.common || "",
              });
            }
          } else {
            countryArr.push({
              language:
                typeof languages[0] === "string"
                  ? languages[0]
                  : String(languages[0]),
              flag: country?.flags?.png || "",
              name: country?.name?.common || "",
            });
          }
        });
      }
      set({ countries: countryArr, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching country data:", error);
    }
  },
}));
