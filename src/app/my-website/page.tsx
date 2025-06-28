import Form from "@/components/Form";
import { countryType } from "@/components/WebsiteDetail";

async function fetchCountryData(): Promise<countryType[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,languages,flags"
  );
  const data = await res.json();

  const countryArr: countryType[] = [];

  if (data.length > 0) {
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
    return countryArr;
  }

  return [];
}

export default async function MyWebsite() {
  const countries = await fetchCountryData();
  return (
    <div className="mx-10 lg:mx-20 my-6">
      <h2 className="mx-6 font-semibold text-2xl lg:text-3xl">Add a website</h2>
      <Form countries={countries} />
    </div>
  );
}
