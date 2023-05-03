import * as React from "react"

import { Pencil, TrashBin, DragVerticalFill } from "akar-icons"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import Link from "next/link"

import { type BOOKMARK } from "pages"

interface Props {
  bookmark: BOOKMARK
  editBookmark: (id: number) => void
  deleteBookmark: (id: number) => void
}

const BookmarkRow: React.FC<Props> = ({
  bookmark,
  editBookmark,
  deleteBookmark,
}) => {
  const y = useMotionValue(0)
  const dragControls = useDragControls()

  const style = { y }

  return (
    <Reorder.Item
      value={bookmark}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="group -mx-1 flex items-center rounded p-1">
        <div
          className="mr-1 cursor-grab text-slate-400"
          style={style as any}
          onPointerDown={(e) => {
            dragControls.start(e)
          }}
        >
          <DragVerticalFill size={15} />
        </div>
        <Link
          target="_blank"
          href={bookmark.link}
          className="my-0 truncate p-1 text-sm text-slate-700 hover:text-slate-900"
        >
          {bookmark.title}
        </Link>
        <div className="ml-auto hidden group-hover:flex">
          <button
            className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            onClick={() => {
              editBookmark(bookmark.id)
            }}
          >
            <Pencil size={17} />
          </button>
          <button
            className="rounded p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
            onClick={() => {
              deleteBookmark(bookmark.id)
            }}
          >
            <TrashBin size={17} />
          </button>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default BookmarkRow