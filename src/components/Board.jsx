

function Board({children}) {


  return (
    <>
      <div className="bg-slate-500 w-full h-96"></div>
      <div className="bg-slate-500 w-full h-[890px]">
        <div className="mx-48">
          <div className="w-full h-[890px]">
            <div className=" h-[900px] w-full">
              <div className=" w-full h-[900px] grid grid-cols-3 grid-rows-3 gap-1">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-500 w-full h-96"></div>
      </div>
    </>
  );
}

export default Board
