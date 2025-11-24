export default function AvatarLogin({ name, image, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow"
      />
      <span className="mt-2 font-semibold">{name}</span>
    </div>
  );
}
