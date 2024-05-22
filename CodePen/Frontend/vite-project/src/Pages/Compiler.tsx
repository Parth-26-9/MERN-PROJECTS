import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import { RootState } from "@/components/Redux Store/store";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSelector } from "react-redux";

export default function Compiler() {

  const html = useSelector((state: RootState) => state.Slice  ) 

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className=" h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
        >
          <HelperHeader/>
          <CodeEditor/>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
        rightSide
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
