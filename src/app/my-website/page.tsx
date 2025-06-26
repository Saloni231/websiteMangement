import Precondition from "@/components/Precondition";
import WebsiteDetail from "@/components/WebsiteDetail";

export default function MyWebsite() {
  return (
    <div className="mx-10 lg:mx-20 my-6">
      <h2 className="mx-6 font-semibold text-2xl lg:text-3xl">Add a website</h2>
      <Precondition />
      <WebsiteDetail />
    </div>
  );
}
