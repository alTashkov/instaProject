import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFile,setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeByte = 2 * 1024 * 1024; // 2MB
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file && file.type.startsWith("image/")){

    }
    else {
        showToast("Error","Please select an image file","error")
        setSelectedFile(null);
    }
  }
}

export default usePreviewImg