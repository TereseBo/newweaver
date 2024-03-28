//This component renders a 10x10 minidraft from a fullsize weaveobject
import './draftpreview.scss';

import { useEffect, useState } from 'react'

import { Grid } from '@/app/components/draft/draft/Grid'
import { readWeaveObject } from '@/app/components/draft/weaveObjHandler/set/readWeaveObject'


export function DraftPreview(params: { weaveObj: WeaveObject }) {

  const [previewGrid, setPreviewGrid] = useState<grid>(new Array(10).fill(new Array(10).fill('', 0)))
  const { weaveObj } = params

  useEffect(() => {
    //Create grids for reading the weave¨
    let shafts = weaveObj.shafts.count || 0
    let newGrids = readWeaveObject(params.weaveObj)

    //Trim since preview cant contain the full width
    let shortTreadleGrid = newGrids.treadleGrid.slice(-11, -1)
    let shortWarpGrid = newGrids.warpGrid.map(row => { return row.slice(-11, -1) })
    let tieUpGrid = newGrids.tieupGrid

    //Returns the color if present for the beat
    function getWeftColor(y: number) {
      if (!shortTreadleGrid) return

      let color = shortTreadleGrid[y].find(isColored)
      return color
    }

    //Returns true if the grid position is colored
    function isColored(gridItem: color) {
      return gridItem !== '';
    }

    //Returns the color of the warp for the requested position
    function getWarpColor(x: number) {

      if (!shortWarpGrid) return

      let warpColumn = []
      for (let i = 0; i < shortWarpGrid.length; i++) {

        warpColumn.push(shortWarpGrid[i][x])
      }
      let warpColor = warpColumn.find(isColored)

      return warpColor
    }

    //Returns positive integer corresponding to the index of warped shaft
    function getWarpedShaft(x: number) {
      if (!shortWarpGrid) return

      for (let i = 0; i <= shafts; i++) {
        if (shortWarpGrid[i][x] != '') {
          return i
        }
      }
      return -1
    }

    //Returns true if shaft and treadle are connected
    function isTiedUp(shaft: number, treadle: number) {
      if (!tieUpGrid) return
      return tieUpGrid[shaft][treadle] != ''
    }

    //Copies weavestate and updates colors according to warp, treadling and tie-up, returns the updated weave
    function fillPreviewGrid(emptyPreview: grid): grid {
      //Resize if needed
      let gridCopy = emptyPreview

      gridCopy.forEach((row: color[], y: number) => {
        let weftColor = getWeftColor(y)

        row.forEach((cell: color, x: number) => {

          let warpColor = getWarpColor(x)

          if (weftColor == undefined) {
            //Set each cell with warpcolor to warpcolor, no color if no warp
            warpColor != undefined ? gridCopy[y][x] = warpColor : gridCopy[y][x] = ''

          } else {

            if (warpColor) {
              let treadleNr = shortTreadleGrid ? shortTreadleGrid[y].indexOf(weftColor) : undefined
              let shaftNr = getWarpedShaft(x)

              //Check tie-up on pos y/x if colored set weft otherwise warp
              if (shaftNr != undefined && treadleNr != undefined) {
                (isTiedUp(shaftNr, treadleNr)) ? gridCopy[y][x] = weftColor : gridCopy[y][x] = warpColor
              }
            } else {
              //No warp but weftcolor displays weft
              gridCopy[y][x] = weftColor
            }
          }
        })
      })
      return gridCopy

    }

    setPreviewGrid(prevValue => fillPreviewGrid(JSON.parse(JSON.stringify(prevValue))))


  }, [params.weaveObj, weaveObj.shafts.count])

  return (
    <div className="preview-container">
      <Grid content={previewGrid} type='preview' />
    </div>
  )

}