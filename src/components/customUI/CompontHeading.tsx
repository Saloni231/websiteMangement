type ComponentHeadingProps = {
  heading: string;
};

export default function ComponentHeading({ heading }: ComponentHeadingProps) {
  return (
    <h3 className="font-semibold text-[24px] leading-[40px] tracking-normal">
      {heading}
    </h3>
  );
}
