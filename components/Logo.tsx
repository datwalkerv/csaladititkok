import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center">
      <Image
        src="/logo.png"
        alt="Családi titkok"
        width={280}
        height={140}
        priority
        className="w-auto"
        style={{ maxHeight: "100px", objectFit: "contain" }}
      />
    </div>
  );
}
