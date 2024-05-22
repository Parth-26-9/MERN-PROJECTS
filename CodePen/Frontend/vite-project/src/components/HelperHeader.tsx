import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLanguage } from "./Redux Store/Slice";
import { RootState } from "./Redux Store/store";
export default function HelperHeader() {

  const dispatch = useDispatch()
  const defaultValue = useSelector((state:RootState)=> state.Slice.currentLanguage)

  return (
    <>
      <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-center items-center gap-5">
        <Button variant="success" className="flex justify-between items-center gap-1">
            <Share2 size={15}/>
            Share</Button>
        <Button variant="secondary">Save</Button>
        <Select defaultValue={defaultValue}
        onValueChange={(value)=> dispatch(updateCurrentLanguage(value))}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">JAVASCRIPT</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
