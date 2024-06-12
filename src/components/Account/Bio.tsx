import useUser from "@hooks/useUser";

export default function Bio() {
  const { user } = useUser({ required: true });
  return (
    <div  >
      <div className="rounded-lg bg-card p-4 w-full flex flex-col gap-3 h-fit pb-10 sticky top-32">
        <h2 className="text-slate-200 text-xl font-bold">النبذه التعريفية</h2>
        <p className="text-slate-300 break-words">
          {user?.bio || "لم يتم إضافة اي نبذه شخصيه بعد !"}
        </p>
      </div>
    </div>
  );
}
