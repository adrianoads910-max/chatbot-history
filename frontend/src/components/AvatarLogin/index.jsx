export default function AvatarLogin({ name, image, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-44 h-44 rounded-full border-4 border-brand-blue-dark shadow bg-amber-50"
      />
      <span className="mt-2 font-semibold">{name}</span>
    </div>
  );
}
