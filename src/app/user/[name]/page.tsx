"use client";
import { Container } from "@components";
import AccountInfo, { TAccountInfoUser } from "@components/Account/AccountInfo";
import { useEffect, useState } from "react";
import { Bio } from "@/components/Account";
import { Posts } from "@/components/Account/Posts";
import useUser from "@/hooks/useUser";
import { TPost } from "@/models/Post";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@components/Ui/Avatar";
import Input from "@components/Ui/Input";
import Button from "@components/Ui/Button";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import uploadImage from "@utils/uploadImage";
import {
  imageTypesAllowed,
  imageTypesAllowedKey,
} from "@/utils/imageTypesAllowed";
import { TUser } from "@/models/User";

type TProps = {
  params: {
    name: string;
  };
};

export default function Page({ params: { name } }: TProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<TPost[]>([]);
  const { user: session_user } = useUser({ required: false });

  useEffect(() => {
    if (!user) return;
    setPosts((user.posts as TPost[]).sort((a, b) => b.createdAt - a.createdAt));
  }, [user]);

  useEffect(() => {
    axios.get(`/api/user/${name}`).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      setUser(res.data.user);
    });
  }, []);

  if (error) {
    return (
      <h1 className="text-slate-200 text-4xl text-center mt-10">{error}</h1>
    );
  }

  if (!user) return <h1>جاري تحميل معلومات المستخدم...</h1>;

  return (
    <Container>
      <AccountInfo user={user as TAccountInfoUser} />
      <div className="flex flex-col gap-4 relative">
        <Bio user={user as TUser} />
        <div className="flex items-center justify-center">
          <Posts posts={posts || []} />
        </div>
      </div>
    </Container>
  );
}

// type TCreatePostProps = {
//   setPosts: Dispatch<SetStateAction<TPost[]>>;
//   user: TUser;
// };

// function CreatePost({ setPosts, user }: TCreatePostProps) {
//   const PostImageRef = useRef<HTMLInputElement>(null);
//   const [files, setFiles] = useState<File[]>([]);
//   const [postText, setPostText] = useState("");

//   function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       const fileList = e.target.files;
//       const filesArray = Array.from(fileList);
//       for (let file of filesArray) {
//         if (!imageTypesAllowed.includes(file.type as imageTypesAllowedKey)) {
//           toast(
//             `يجب عليك إدخال صورة بإمتداد ${imageTypesAllowed.join(" , ")}`,
//             {
//               type: "error",
//             }
//           );
//           return;
//         }
//       }
//       setFiles((prev) => [...prev, ...filesArray]);
//     }
//   }
//   function uploadImages() {
//     return new Promise<string[]>((resolve, reject) => {
//       const imagesURLs: string[] = [];

//       if (files.length > 0) {
//         const uploadPromises = files.map((file) => {
//           return uploadImage(file)
//             .then((newUrl) => newUrl)
//             .catch((err) => {
//               console.log({ errorWhileUploadImagesToServer: err });
//               throw err; // This will make Promise.all reject if any single upload fails
//             });
//         });

//         Promise.all(uploadPromises)
//           .then((results) => {
//             // @ts-ignore
//             resolve(results);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } else {
//         resolve(imagesURLs);
//       }
//     });
//   }
//   async function handlePost() {
//     const images = await uploadImages();
//     if (postText.trim() === "") {
//       if (images.length < 1) {
//         toast("يجب عليك أن تدخل صور او نص علي الأقل لرفع المنشور", {
//           type: "error",
//         });
//         return;
//       }
//     }
//     const form = new FormData();
//     form.set("post-text", postText);
//     form.set("post-images", JSON.stringify(images));
//     form.set("email", user.email);
//     const res = await axios.post(`/api/posts/create`, form);
//     if (res.data.error) {
//       toast.error(res.data.error);
//       return;
//     }
//     setPosts(res.data.data.slice().reverse());
//     setPostText("");
//     setFiles([]);
//   }

//   return (
//     <div className="bg-card rounded-lg p-4 flex-1">
//       <div className="bg-sub-card p-2 rounded-lg flex">
//         <Avatar size="md">
//           <AvatarImage src={user?.image} size="md" />
//           <AvatarFallback>{user?.name}</AvatarFallback>
//         </Avatar>
//         <Input className="bg-sub-card">
//           <textarea
//             className="resize-none input !h-24 leading-7"
//             placeholder={`ما اللذي يدور في ذهنك, ${user?.name.split(" ")[0]} ؟`}
//             value={postText}
//             onChange={(e) => setPostText(e.target.value)}
//           ></textarea>
//         </Input>
//       </div>
//       <div className="mt-4">
//         {files.length > 0 &&
//           files.map((file, i) => (
//             <div className="flex items-center justify-between" key={i}>
//               <p className="text-slate-200 my-2">
//                 {file.name.length > 20
//                   ? file.name.substr(0, 30) + "..."
//                   : file.name}
//               </p>
//               <button
//                 className="text-slate-200 flex items-center bg-red-600 px-1 hover:bg-red-700 transition-colors duration-300 ease-linear"
//                 onClick={() => {
//                   setFiles(files.filter((f) => f !== file));
//                 }}
//               >
//                 <span>حذف</span>
//                 <FaTimes />
//               </button>
//             </div>
//           ))}
//       </div>
//       <div className="flex justify-between items-center">
//         <Button
//           variant="light-form-btn"
//           className="mt-5 !text-lg"
//           onClick={() => PostImageRef.current?.click()}
//         >
//           <input
//             type="file"
//             hidden
//             id="post-img"
//             multiple
//             accept=".jpg, .png, .jpeg"
//             ref={PostImageRef}
//             onChange={handleChangeImage}
//           />
//           <Image
//             src={"/icons/image-icon.png"}
//             alt="image-icon"
//             width={25}
//             height={25}
//           />
//           إرفع صورة
//         </Button>
//         <Button
//           variant="main"
//           className="mt-5 !px-9 min-h-11 !text-lg"
//           onClick={handlePost}
//         >
//           نشر
//         </Button>
//       </div>
//       <ToastContainer
//         theme="dark"
//         position="bottom-right"
//         closeOnClick
//         closeButton={false}
//         rtl
//       />
//     </div>
//   );
// }
