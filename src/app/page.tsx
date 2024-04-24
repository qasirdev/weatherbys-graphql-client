'use client'
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { selectedUser,status,error } = useSelector(
    (state: RootState) => state.user,
  )
  if(status === 'succeeded' && selectedUser?.id) {
    router.push(`/todoList/${selectedUser?.id}`);
  }

  if(!selectedUser?.id && status === 'succeeded') {
    return (
      <h1> Pleas login </h1>
    );
  } else {
    return <div>Loading...</div>
  }

}
