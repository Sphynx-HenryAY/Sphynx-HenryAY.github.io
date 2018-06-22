function IPGridViewData(strGridId, strCallerId, strContainerId, strHiddenRowsFieldId, intRowCount, strRowStyle, strAlternatingRowStyle, intOrderColumn,
strRowUpIcon, strRowDownIcon, strRowIconH2, strRowIconH9, blnFooterRowVisible, recordCountLabelId, serverSidePaging, clientPager, clientPagerDivId,
pageSize, pageIndex, lockedRowCount, maxRowCount, callbackHandlerID, totalRecordCount, callbackOnReorder, waitPanelID, maxHeight, scrollingPanelID,
selectColumnIndex, onDeleteCallback, onCallbackScript, onCallbackFunc, selectColumnClickFunction, customWaitFunc, customCompleteFunc, isWCAG)
{
this.gridId=strGridId;
this.name = strGridId + '_Data';
this.callerId=strCallerId;
this.containerId=strContainerId;
this.hiddenRowsFieldId=strHiddenRowsFieldId;
this.rowStyle=strRowStyle;
this.alternatingRowStyle=strAlternatingRowStyle;
this.rowReferences=new Array();
this.controlReferences=new Array();
this.orderColumn=intOrderColumn;
this.rowUpIcon=strRowUpIcon;
this.rowDownIcon=strRowDownIcon;
this.rowIconH2=strRowIconH2;
this.rowIconH9=strRowIconH9;
this.footerRowVisible=blnFooterRowVisible;
this.recordCountLabelId=recordCountLabelId;
var objTable=document.getElementById(strGridId);
this.gridTable=objTable;
this.templateRowId=objTable.rows[1].id;
this.templateRowCells=new Array();
this.serverSidePaging=serverSidePaging;
this.pageSize=pageSize;
this.pageIndex=pageIndex;
this.lockedRowCount=lockedRowCount;
this.maxRowCount=maxRowCount;
this.cellInfo=new Array();
this.cellInfo[0]=new Array();
this.callbackHandlerID=callbackHandlerID;
this.totalRecordCount=totalRecordCount;
this.callbackOnReorder=callbackOnReorder;
this.waitPanelID=waitPanelID;
this.maxHeight=maxHeight;
this.scrollingPanelID=scrollingPanelID;
this.selectColumnIndex=selectColumnIndex;
this.onDeleteCallback=onDeleteCallback;
this.onCallbackScript=onCallbackScript;
this.onCallbackFunc=onCallbackFunc;
this.selectColumnClickFunction=selectColumnClickFunction;
this.customWaitFunc=customWaitFunc;
this.customCompleteFunc=customCompleteFunc;
this.isWCAG=isWCAG;
for (var i=0; i<objTable.rows[1].cells.length; i++)
{
this.templateRowCells.push(objTable.rows[1].cells[i].cloneNode(true));
this.cellInfo[0][i]=new IPGridCell(this, objTable.rows[1].cells[i]);
if (ipjIsIE)
{
var scriptArray = objTable.rows[1].cells[i].getElementsByTagName('script');
var newScriptArray = this.templateRowCells[i].getElementsByTagName('script');
if (scriptArray && newScriptArray)
{
for(var j=0; j<newScriptArray.length; j++)
{
newScriptArray[j].text=scriptArray[j].text;
}
}
if (objTable.rows[1].cells[i].children.length>0)
{
var ctlChild=objTable.rows[1].cells[i].children[0];
if (ctlChild.tagName == 'SELECT')
{
for (var j=0; j<ctlChild.children.length; j++)
{
if (this.templateRowCells[i].children[0].children[j].tagName == 'OPTION')
{
this.templateRowCells[i].children[0].children[j].selected=ctlChild.children[j].selected;
}
}
}
}
}
}
if (!serverSidePaging || intRowCount==0)
{
objTable.deleteRow(1);
this.rowReferences.push(0);
this.controlReferences.push(0);
for (var i=1; i<=intRowCount; i++)
{
this.rowReferences.push(i);
this.cellInfo[i]=new Array();
if (objTable.rows[i] !=null)
{
for (var j=0; j<objTable.rows[i].cells.length; j++)
{
this.cellInfo[i][j]=new IPGridCell(this, objTable.rows[i].cells[j]);
}
}
this.controlReferences.push(i);
if (objTable.rows[i] !=null)
{
if (i % 2 !=0)
objTable.rows[i].className=strRowStyle;
else
objTable.rows[i].className=strAlternatingRowStyle;
}
}
}
else
{
this.rowReferences.push(0);
this.controlReferences.push(0);
for (var i=1; i<=intRowCount; i++)
{
this.rowReferences.push(i);
this.cellInfo[i]=new Array();
for (var j=0; j<objTable.rows[i].cells.length; j++)
{
this.cellInfo[i][j]=new IPGridCell(this, objTable.rows[i].cells[j]);
}
this.controlReferences.push(i);
if (i % 2==0)
objTable.rows[i].className=strRowStyle;
else
objTable.rows[i].className=strAlternatingRowStyle;
}
}
IPSetHiddenRowsControl(this);
this.recordCount=intRowCount;
reorderRows(this);
if (clientPager !=null)
{
clientPager.init(blnFooterRowVisible, recordCountLabelId);
clientPager.showPageNav(strGridId + '_Pager', clientPagerDivId);
clientPager.showPage(1);
}
this.doCallback=function(args){IPGridViewCallback(this.callerId, this.containerId, args, this.waitPanelID, this.onCallbackScript,
this.onCallbackFunc, this.customWaitFunc, this.customCompleteFunc);}
if (this.selectColumnClickFunction)
{
var objRows=new Array();
var rowRefs=this.rowReferences;
for (var i=1; i<rowRefs.length; i++){
if (rowRefs[i]>0){
var objRow=this.gridTable.rows[rowRefs[i]];
if (objRow !=null)
{
var objCell=objRow.cells[this.selectColumnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox && !objCheckBox.disabled)
{
objCheckBox.onclick=this.selectColumnClickFunction;
}
}
}
}
}
}
function IPGridViewGetRowIndex(gridData,cellControl)
{
var objElement=cellControl;
while (objElement && objElement.tagName.toLowerCase() != 'tr')
{
objElement=objElement.parentNode;
}
if (objElement)
return objElement.rowIndex;
return-1;
}
function IPSetHiddenRowsControl(gridData)
{
var objRowArray=null;
if (gridData.serverSidePaging && gridData.totalRecordCount>0)
{
objRowArray=new Array();
objRowArray.push(0);
for (var i=0; i<gridData.pageIndex; i++)
{
for (var j=0; j<gridData.pageSize; j++)
{
if (i>0 || j>0)
objRowArray.push(j+(i*gridData.pageSize));
}
}
for (var i=1; i<gridData.controlReferences.length; i++)
{
if (gridData.controlReferences[i]>0)
{
if (gridData.pageIndex>0)
objRowArray.push(gridData.controlReferences[i]+(gridData.pageSize*gridData.pageIndex)-1);
else
objRowArray.push(gridData.controlReferences[i]);
}
else
objRowArray.push(0);
}
for (var i=objRowArray.length; i<gridData.totalRecordCount-1; i++)
{
objRowArray.push(i);
}
}
else
{
objRowArray=gridData.controlReferences;
}
document.getElementById(gridData.hiddenRowsFieldId).value = objRowArray.join(',');
}
function IPGridCell(gridData, cell)
{
this.gridData=gridData;
var inputArray = cell.getElementsByTagName('input');
if (!inputArray || !inputArray[0])
inputArray = cell.getElementsByTagName('textarea');
if (!inputArray || !inputArray[0])
inputArray = cell.getElementsByTagName('select');
var editControlID = '';
if (inputArray && inputArray[0])
editControlID=inputArray[0].id;
var linkControl=null;
var linkArray = cell.getElementsByTagName('a');
if (linkArray || linkArray[0])
linkControl=linkArray[0];
this.editControlID=editControlID;
this.linkControl=linkControl;
this.updateCellText=function(value)
{
if (gridData.callbackHandlerID)
{
var objReturnFunc=function(objXMLHTTP)
{
if (objXMLHTTP.responseText.charAt(0) == 's')
{
document.getElementById(editControlID).value=objXMLHTTP.responseText.substring(1);
}
}
ipjDoXmlHttpRequest(gridData.callbackHandlerID, document.forms['IronPointForm'].action,'UpdateCellValue=' + value, objReturnFunc);
}
}
}
function IPGridViewOptionButtonClick(controlArray, clickedIndex){
for(var i=0;i<controlArray.length;i++){
if((i!=clickedIndex)&&(controlArray[i]!=null)){
controlArray[i].checked=false;
}
}
}
function IPGridViewOptionButtonClear(controlArray){
for(var i=0;i<controlArray.length;i++){
if(controlArray[i]!=null){
controlArray[i].checked=false;
}
}
}
function IPGridViewAddRow(gridData)
{
if (gridData.maxRowCount>0)
{
if (gridData.footerRowVisible)
{
if (gridData.gridTable.rows.length-2>=gridData.maxRowCount)
{
alert('Maximum row limit has been reached');
return;
}
}
else
{
if (gridData.gridTable.rows.length-1>=gridData.maxRowCount)
{
alert('Maximum row limit has been reached');
return;
}
}
}
var newRow;
if (gridData.footerRowVisible)
newRow=gridData.gridTable.insertRow(gridData.gridTable.rows.length-1);
else
newRow=gridData.gridTable.insertRow(gridData.gridTable.rows.length);
var previousRow=null;
if (newRow.rowIndex>1)
previousRow=gridData.gridTable.rows[newRow.rowIndex-1];
for (var i=gridData.templateRowCells.length-1; i>=0; i--)
{
var objCell=newRow.insertCell(0);
objCell.innerHTML=gridData.templateRowCells[i].innerHTML.replace(/GridViewRowIndex/g,gridData.rowReferences.length);
if (gridData.templateRowCells[i].innerHTML.indexOf('ColorPicker') > -1 && typeof allcolorboxes != "undefined")
{
allcolorboxes[allcolorboxes.length] = 'cbx_' + objCell.getElementsByTagName('input')[0].id;
var templateColorBox = document.getElementById('cbx_' + gridData.templateRowCells[i].getElementsByTagName('input')[0].id);
var previousColorBox=null;
if (previousRow !=null)
previousColorBox = document.getElementById('cbx_' + previousRow.cells[i].getElementsByTagName('input')[0].id);
var newColorBox=templateColorBox.cloneNode(false);
newColorBox.id=allcolorboxes[allcolorboxes.length-1];
var strHTML=templateColorBox.innerHTML;
newColorBox.innerHTML=strHTML.replace(/intDataIndex/g,gridData.rowReferences.length-1).replace(/intRowIndex/,gridData.rowReferences.length).replace(/GridViewRowIndex/g,gridData.rowReferences.length);
if (previousColorBox !=null)
previousColorBox.parentNode.insertBefore(newColorBox,previousColorBox.nextSibling);
else
templateColorBox.parentNode.insertBefore(newColorBox,templateColorBox.nextSibling);
}
var objInputs = objCell.getElementsByTagName('input');
if (objInputs && objInputs.length > 0 && objInputs[0].type == 'radio')
{
var objArrayName = objInputs[0].parentNode.attributes['arrayName'];
if (objArrayName)
{
var objArray=eval(objArrayName.nodeValue);
if (objArray)
{
objArray[gridData.rowReferences.length]=objInputs[0];
}
}
}
}
for (var i=gridData.templateRowCells.length-1; i>=0; i--)
{
newRow.cells[i].style.display=gridData.templateRowCells[i].style.display;
newRow.cells[i].style.width=gridData.templateRowCells[i].style.width;
newRow.cells[i].className=gridData.templateRowCells[i].className;
}
newRow.id=gridData.templateRowId.replace(/GridViewRowIndex/g,gridData.rowReferences.length);
if (newRow.rowIndex % 2==0)
newRow.className=gridData.alternatingRowStyle;
else
newRow.className=gridData.rowStyle;
gridData.controlReferences.push(gridData.rowReferences.length);
gridData.rowReferences.push(newRow.rowIndex);
gridData.cellInfo[gridData.rowReferences.length-1]=new Array();
for (var j=newRow.cells.length-1; j>=0; j--)
{
gridData.cellInfo[gridData.rowReferences.length-1][j]=new IPGridCell(gridData, newRow.cells[j]);
var scriptArray = newRow.cells[j].getElementsByTagName('script');
if (scriptArray && scriptArray.length && Number(scriptArray.length)>0)
{
for (var i=0; i<Number(scriptArray.length); i++)
{
var script=scriptArray[i];
eval(script.text.replace('<!--','').replace('//-->',''));
}
}
}
IPSetHiddenRowsControl(gridData);
gridData.recordCount=gridData.recordCount+1;
reorderRows(gridData);
if (gridData.footerRowVisible)
gridData.gridTable.rows[gridData.gridTable.rows.length-1].scrollIntoView(false);
return newRow;
}
function IPGridViewToggleRowCount(gridData, newCount)
{
newCount=Number(newCount);
var intDiff=newCount-gridData.recordCount;
if (intDiff>0)
{
for (var i=0; i<intDiff; i++)
{
IPGridViewAddRow(gridData);
}
}
if (intDiff<0)
{
intDiff=intDiff*-1;
for (var i=0; i<intDiff; i++)
{
var intIndex=0;
for (var j=0; j<gridData.rowReferences.length; j++)
{
if (gridData.rowReferences[j]==gridData.recordCount)
{
intIndex=j;
}
}
IPGridViewDeleteRow(gridData, intIndex);
}
}
}
function IPGridViewMoveRow(gridData, rowIndexFrom, rowIndexTo)
{
if (rowIndexFrom>rowIndexTo)
{
for (var i=rowIndexFrom; i>rowIndexTo; i--)
{
swapRows(gridData.gridTable, i, i-1);
var index1;
var index2;
for (var j=0; j<gridData.rowReferences.length; j++)
{
if (gridData.rowReferences[j]==i)
index1=j;
if (gridData.rowReferences[j]==i-1)
index2=j;
}
var temp=gridData.rowReferences[index1];
gridData.rowReferences[index1]=gridData.rowReferences[index2];
gridData.rowReferences[index2]=temp;
temp=gridData.controlReferences[i];
gridData.controlReferences[i]=gridData.controlReferences[i-1];
gridData.controlReferences[i-1]=temp;
}
}
else
{
for (var i=rowIndexFrom; i<rowIndexTo; i++)
{
swapRows(gridData.gridTable, i, i+1);
var index1;
var index2;
for (var j=0; j<gridData.rowReferences.length; j++)
{
if (gridData.rowReferences[j]==i)
index1=j;
if (gridData.rowReferences[j]==i+1)
index2=j;
}
var temp=gridData.rowReferences[index1];
gridData.rowReferences[index1]=gridData.rowReferences[index2];
gridData.rowReferences[index2]=temp;
temp=gridData.controlReferences[i];
gridData.controlReferences[i]=gridData.controlReferences[i+1];
gridData.controlReferences[i+1]=temp;
}
}
IPSetHiddenRowsControl(gridData);
reorderRows(gridData);
if (gridData.callbackOnReorder)
{
IPGridViewCallback(gridData.callerId, gridData.containerId, "RowReorder", gridData.waitPanelID, gridData.onCallbackScript, null, null, null, gridData);
}
}
function IPGridViewDeleteRowsClick(gridData)
{
if (gridData.onDeleteCallback)
{
var onServerResponse=function(objXMLHTTP){
if (objXMLHTTP.responseText.charAt(1) == '1'){
IPGridViewDeleteRows(gridData);
}else{
alert(objXMLHTTP.responseText.substring(2));
}
}
ipjDoXmlHttpRequest(gridData.callerId, document.forms['IronPointForm'].action, 'onDelete', onServerResponse);
return;
}
IPGridViewDeleteRows(gridData);
}
function IPGridViewDeleteRows(gridData)
{
var rowRefs=gridData.rowReferences;
for (var i=1; i<rowRefs.length; i++){
if (rowRefs[i]>0){
var objRow=gridData.gridTable.rows[rowRefs[i]];
var objCell=objRow.cells[gridData.selectColumnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox && objCheckBox.checked && !objCheckBox.disabled){
IPGridViewDeleteRow(gridData, i);
}
}
}
}
function IPGridViewGetRowCount(gridData){
return gridData.gridTable.rows.length;
}
function IPGridViewGetRows(gridData)
{
var objRows=new Array();
var rowRefs=gridData.rowReferences;
for (var i=1; i<rowRefs.length; i++){
if (rowRefs[i]>0){
var objRow=gridData.gridTable.rows[rowRefs[i]];
objRows.push(objRow);
}
}
return objRows;
}
function IPGridViewGetSelectedRows(gridData)
{
var objRows=new Array();
var rowRefs=gridData.rowReferences;
for (var i=1; i<rowRefs.length; i++){
if (rowRefs[i]>0){
var objRow=gridData.gridTable.rows[rowRefs[i]];
var objCell=objRow.cells[gridData.selectColumnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox && objCheckBox.checked && !objCheckBox.disabled){
objRows.push(objRow);
}
}
}
return objRows;
}
function IPGridViewSelectRow(gridData, row, disable, suppressEvents)
{
var objCell=row.cells[gridData.selectColumnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox)
{
objCheckBox.checked=true;
if (!suppressEvents && objCheckBox.onclick)
objCheckBox.onclick();
if (disable) objCheckBox.disabled=true;
}
}
function IPGridViewDeleteRowClick(gridData, rowIndex, refresh)
{
if (gridData.onDeleteCallback){
var onServerResponse=function(objXMLHTTP){
if (objXMLHTTP.responseText.charAt(1) == '1'){
IPGridViewDeleteRow(gridData,rowIndex,refresh);
}else{
alert(objXMLHTTP.responseText.substring(2));
}
}
ipjDoXmlHttpRequest(gridData.callerId, document.forms['IronPointForm'].action, 'onDelete'+gridData.rowReferences[rowIndex], onServerResponse);
return;
}
IPGridViewDeleteRow(gridData, rowIndex, refresh);
}
function IPGridViewDeleteRow(gridData, rowIndex, refresh)
{
var intDeletedIndex=gridData.rowReferences[rowIndex];
gridData.gridTable.deleteRow(gridData.rowReferences[rowIndex]);
gridData.rowReferences[rowIndex]=0;
var objControlReferences=gridData.controlReferences;
gridData.controlReferences=new Array();
for (var i=0; i<intDeletedIndex; i++)
gridData.controlReferences.push(objControlReferences[i]);
for (var i=intDeletedIndex+1; i<objControlReferences.length; i++)
gridData.controlReferences.push(objControlReferences[i]);
for (var i=0; i<gridData.rowReferences.length; i++)
{
if (gridData.rowReferences[i]>intDeletedIndex)
{
gridData.rowReferences[i]=gridData.rowReferences[i]-1;
var objRow=gridData.gridTable.rows[gridData.rowReferences[i]];
if (objRow.className==gridData.rowStyle)
objRow.className=gridData.alternatingRowStyle;
else
objRow.className=gridData.rowStyle;
}
}
IPSetHiddenRowsControl(gridData);
gridData.recordCount=gridData.recordCount-1;
reorderRows(gridData);
if (refresh)
{
IPGridViewCallback(gridData.callerId, gridData.containerId, "Refresh", gridData.waitPanelID, gridData.onCallbackScript, null, null, null, gridData);
}
}
function IPGridViewSelectDeselectColumn(gridData, columnIndex, childColumns, forceSelected)
{
var blnDoCheck = typeof(forceSelected) == 'undefined';
var rowRefs=gridData.rowReferences;
var blnAllSelected=forceSelected ? false : true;
if (blnDoCheck)
{
for (var i=1; i<rowRefs.length; i++)
{
if (rowRefs[i]>0)
{
var objRow=gridData.gridTable.rows[rowRefs[i]];
if (objRow.style.display != 'none')
{
var objCell=objRow.cells[columnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox && !objCheckBox.checked && !objCheckBox.disabled)
{
blnAllSelected=false;
break;
}
}
}
}
}
for (var i=1; i<rowRefs.length; i++)
{
if (rowRefs[i]>0)
{
var objRow=gridData.gridTable.rows[rowRefs[i]];
if (objRow.style.display != 'none')
{
var objCell=objRow.cells[columnIndex];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox && !objCheckBox.disabled)
{
objCheckBox.checked=!blnAllSelected;
if (objCheckBox.onclick)
objCheckBox.onclick();
IPGridViewToggleChildCheckboxColumns(gridData, i, childColumns,
objCheckBox.checked)
}
}
}
}
}
function IPGridViewToggleChildCheckboxColumns(gridData, rowIndex, childColumns, checked)
{
if (childColumns)
{
var rowRefs=gridData.rowReferences;
var objRow=gridData.gridTable.rows[rowRefs[rowIndex]];
for (var i=0; i<childColumns.length; i++)
{
var objCell=objRow.cells[Number(childColumns[i])];
var objCheckBox = objCell.getElementsByTagName('input')[0];
if (objCheckBox)
{
objCheckBox.disabled=!checked;
if (!checked)
{
objCheckBox.checked=false;
if (objCheckBox.onclick)
objCheckBox.onclick();
}
}
var objLink = objCell.getElementsByTagName('a')[0];
if (objLink)
{
if (checked){
objLink.style.display = '';
}else{
objLink.style.display = 'none';
}
}
}
}
}
function IPGridViewToggleChildColumns(parentCellValue, args)
{
var gridData=args[0];
var rowIndex=args[1];
var childColumns=args[2];
if (childColumns)
{
for (var i=0; i<childColumns.length; i++)
{
var objCell=gridData.cellInfo[rowIndex][Number(childColumns[i])];
if (objCell.onParentUpdate)
objCell.onParentUpdate(objCell, parentCellValue);
}
}
}
function reorderRows(gridData)
{
if (gridData.orderColumn>0)
{
var rowRefs=gridData.rowReferences;
for (var i=1; i<rowRefs.length; i++)
{
if (rowRefs[i]>0)
{
var objRow=gridData.gridTable.rows[rowRefs[i]];
if(objRow){
var objCell=objRow.cells[0];
if (gridData.orderColumn==1)
{
if (gridData.serverSidePaging)
objCell.innerHTML = '' + (objRow.rowIndex + (gridData.pageSize * gridData.pageIndex));
else
objCell.innerHTML = '' + objRow.rowIndex;
}
else
objCell.innerHTML=getRowOrderHTML(gridData,objRow.rowIndex,gridData.recordCount,gridData.lockedRowCount);
}
}
}
}
if (ipjIsIE && gridData.maxHeight>0)
{
setTimeout("setPanelSize(" + gridData.name + ")",0);
}
}
function setPanelSize(gridData)
{
var objContainer=document.getElementById(gridData.scrollingPanelID);
var objPaddingCell = document.getElementById(gridData.scrollingPanelID.replace('_ScrollingPanel','_PaddingCell'));
if (objContainer.scrollHeight>gridData.maxHeight)
{
objContainer.style.height = '' + gridData.maxHeight + 'px';
objPaddingCell.style.display = '';
}
else
{
objContainer.style.height = 'auto';
objPaddingCell.style.display = 'none';
}
}
function getRowOrderHTML(gridData, rowIndex, count, lockedRowCount)
{
var intUpArrowTo=rowIndex-1;
var intOrder=rowIndex;
var intDownArrowTo=rowIndex+1;
rowIndex--;
var strLead = '<table summary="outer order table" class="ipb-no" cellspacing="0" cellpadding="0"><tr><td><table summary="inner order table" class="ipb-no" cellSpacing="0" cellPadding="0" style="width:10px">';
var strMidRow = '<tr><td>' + gridData.rowIconH2 + '</td></tr>';
var strFontSize = '';
if (intOrder>99){
strFontSize = 'font-size:10px';
}
var strOrderNumLink = '<input type=\"text\" title=\"Click to edit\" onkeypress=\"return lockField(event);\"'
+ 'onblur=\"return indexOnBlur(' + gridData.name + ', this,' + intOrder + ',' + count + ',' + lockedRowCount + ');\"'
+ 'onmouseover=\"indexOnMouseOver(this);\" onclick=\"indexOnClick(this);\" style=\"background-color:Transparent;border-width:0px;border-style:None;width:20px;' + strFontSize + '\" value=\"' + intOrder + '\">';
var strDisabledOrderNumLink = '<input type=\"text\" ' + (gridData.isWCAG?'title=\"Row number\" ':'')
+ 'onmouseover=\"indexOnMouseOver(this);\" style=\"background-color:Transparent;border-width:0px;border-style:None;width:20px;\" value=\"' + intOrder + '\" READONLY>';
var strTail = '</td></tr></table>';
count--;
if((rowIndex==0 || rowIndex==lockedRowCount) && (rowIndex!=count) && (rowIndex>lockedRowCount-1))
{
return strLead+
'<tr><td>' + gridData.rowIconH9 + '</td></tr>' +
strMidRow+
"<tr><td><a class=\"ipb\" href=\"javascript:IPGridViewMoveRow(" + gridData.name + ", " + intOrder + ", " + intDownArrowTo + ");\">" + gridData.rowDownIcon + "</a></td></tr>" +
"</table></td><td class=\"orderpaddingcell\" style=\"width:8px\">&nbsp;</td><td class=\"orderinputcell\">" + strOrderNumLink + strTail;
}
else
{
if((rowIndex!=0) && (rowIndex!=count) && (rowIndex>lockedRowCount-1))
{
return strLead+
"<tr><td><a class=\"ipb\" href=\"javascript:IPGridViewMoveRow(" + gridData.name + ", " + intOrder + ", " + intUpArrowTo + ");\">" + gridData.rowUpIcon + "</td></tr>" +
strMidRow+
"<tr><td><a class=\"ipb\" href=\"javascript:IPGridViewMoveRow(" + gridData.name + ", " + intOrder + ", " + intDownArrowTo + ");\">" + gridData.rowDownIcon + "</td></tr>" +
"</table></td><td class=\"orderpaddingcell\" style=\"width:8px\">&nbsp;</td><td class=\"orderinputcell\">" + strOrderNumLink + strTail;
}
else
{
if((rowIndex!=0) && (rowIndex==count) && (rowIndex>lockedRowCount))
{
return strLead+
"<tr><td><a class=\"ipb\" href=\"javascript:IPGridViewMoveRow(" + gridData.name + ", " + intOrder + ", " + intUpArrowTo + ");\">" + gridData.rowUpIcon + "</td></tr>" +
strMidRow+
"<tr><td>&nbsp;</td></tr>" +
"</table></td><td class=\"orderpaddingcell\" style=\"width:8px\">&nbsp;</td><td class=\"orderinputcell\">" + strOrderNumLink + strTail;
}
else
{
return strLead+
'<tr><td></td></tr>' + strMidRow +
"<tr><td></td></tr>" + "</table></td><td class=\"orderpaddingcell\" style=\"width:8px\">&nbsp;</td><td class=\"orderinputcell\">" + strDisabledOrderNumLink + strTail;
}
}
}
}
function indexOnMouseOver(textBox)
{
textBox.style.cursor='pointer';
}
function limitToNumbers(e)
{
return ipKeyRestrict(e, '1234567890', true, this);
}
function lockField(e)
{
return false;
}
function indexOnClick(textBox)
{
textBox.style.backgroundColor='white';
textBox.select();
textBox.onkeypress=limitToNumbers;
}
function indexOnBlur(gridData, textBox, originalIndex, rowCount, lockedRowCount)
{
textBox.style.backgroundColor='Transparent';
textBox.onkeypress=lockField;
var intValue=Number(textBox.value);
if (intValue<=0 || intValue>rowCount || intValue<=lockedRowCount)
{
alert('Invalid index.');
textBox.value=originalIndex;
return false;
}
if (intValue !=originalIndex)
{
IPGridViewMoveRow(gridData, originalIndex, intValue);
}
return true;
}
function swapRows(table, rowIndex1, rowIndex2)
{
if (table && table.rows && rowIndex1 !=rowIndex2)
{
var i=Number(rowIndex1);
var j=Number(rowIndex2);
if (i>j)
{
var iTemp=i;
i=j;
j=iTemp;
}
var trs=table.rows;
if(i==j+1)
trs[i].parentNode.insertBefore(trs[i], trs[j]);
else if(j==i+1)
trs[i].parentNode.insertBefore(trs[j], trs[i]);
else
{
var tmpNode=trs[j].parentNode.replaceChild(trs[i], trs[j]);
if(typeof(trs[i]) != "undefined")
trs[i].parentNode.insertBefore(tmpNode, trs[i]);
else
table.appendChild(tmpNode);
}
}
}
function IPGridPager(tableName, itemsPerPage, recordLabelText, prevLabelText, nextLabelText)
{
this.inited=false;
this.tableName=tableName;
this.itemsPerPage=itemsPerPage;
this.currentPage=1;
this.pages=0;
if ((prevLabelText==null) || (prevLabelText.length==0)){
this.prevText = 'Prev';
}else{
this.prevText=prevLabelText;
}
if ((nextLabelText==null) || (nextLabelText.length==0)){
this.nextText = 'Next';
}else{
this.nextText=nextLabelText;
}
this.showRecords=function(from, to){
var rows=document.getElementById(tableName).rows;
var intLength=rows.length;
if (this.footerRowVisible)
intLength--;
for (var i=1; i<intLength; i++){
if (i<from || i>to)
rows[i].style.display = 'none';
else
rows[i].style.display = '';
}
}
this.showPage=function(pageNumber){
if (! this.inited){
alert("not inited");
return;
}
var oldPageAnchor = document.getElementById('pg'+this.currentPage);
oldPageAnchor.className = 'pg-normal';
this.currentPage=pageNumber;
var newPageAnchor = document.getElementById('pg'+this.currentPage);
newPageAnchor.className = 'pg-selected';
var from=(pageNumber-1) * itemsPerPage+1;
var to=from+itemsPerPage-1;
if (to>this.recordCount)
to=this.recordCount;
this.showRecords(from, to);
var recordCountLabel=document.getElementById(this.recordCountLabelId);
if (recordCountLabel !=null){
if ((recordLabelText==null) || (recordLabelText.length==0)){
recordLabelText = 'Records {0} to {1} of {2}';
}
recordCountLabel.innerHTML = recordLabelText.replace('{0}', from).replace('{1}', to).replace('{2}', this.recordCount).replace('{3}', this.currentPage).replace('{4}',this.pages);
}
this.showPageNav(this.pagerName, this.pagerPositionId);
document.body.scrollIntoView();
}
this.prev=function(){
if (this.currentPage>1)
this.showPage(this.currentPage-1);
}
this.next=function(){
if (this.currentPage<this.pages){
this.showPage(this.currentPage+1);
}
}
this.init=function(footerVisible, recordCountLabelId){
var rows=document.getElementById(tableName).rows;
this.recordCount=(rows.length-1);
if (footerVisible)
this.recordCount=this.recordCount-1;
this.pages=Math.ceil(this.recordCount/itemsPerPage);
this.recordCountLabelId=recordCountLabelId;
this.footerRowVisible=footerVisible;
this.inited=true;
}
this.showPageNav=function(pagerName, positionId){
if (! this.inited){
alert("not inited");
return;
}
this.pagerName=pagerName;
this.pagerPositionId=positionId;
var element=document.getElementById(positionId);
var pagerHtml;
if (this.currentPage>1)
pagerHtml = '<a href="javascript:void(0);" onclick="' + pagerName + '.prev();"> &#171 ' + this.prevText + ' </a> | ';
else
pagerHtml = '<span> &#171 ' + this.prevText + ' </span> | ';
for (var page=1; page<=this.pages; page++){
if (page !=this.currentPage)
pagerHtml += '<a href="javascript:void(0);" id="pg' + page + '" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</a> | ';
else
pagerHtml += '<span id="pg' + page + '">' + page + '</span> | ';
}
if (this.currentPage<this.pages)
pagerHtml += '<a href="javascript:void(0);" onclick="'+pagerName+'.next();" class="pg-normal"> ' + this.nextText + ' &#187;</a>';
else
pagerHtml += '<span> ' + this.nextText + ' &#187;</span>';
element.innerHTML=pagerHtml;
}
}
function IPGridViewGetAddButton(gridID){
var inputElms=document.getElementById(gridID+"_ctlIPGridView").getElementsByTagName("INPUT");
for (var i=0; i<inputElms.length; i++){
if (inputElms[i].type=="submit" && inputElms[i].value=="Add") {
return inputElms[i];
break;
}
}
return null;
}
function IPGridViewGetTableRows(gridID){
return document.getElementById(gridID+"_ctlIPGridView").getElementsByTagName("TR");
}
function IPGridViewGetCellInput(tableRow,columnName){
var columnRegExp=new RegExp(columnName+"_","gi");
var rowInputElms=tableRow.getElementsByTagName("INPUT");
for (var i=0; i<rowInputElms.length; i++){
if (rowInputElms[i].id.match(columnRegExp)){
return rowInputElms[i];
}
}
return null;
}
function IPGridViewDisableDelete(tableRow){
var cellElms=tableRow.getElementsByTagName("TD");
cellElms[cellElms.length-1].innerHTML=""; //assumes the last column is the "Delete" column
}
function IPGridViewCallback(callerID, containerID, args, waitPanelID, onCallbackScript, callbackFunc, customWaitFunc, customCompleteFunc, gridData)
{
var updatePanel=document.getElementById(containerID);
var waitPanel=document.getElementById(waitPanelID);
if (!customWaitFunc)
{
waitPanel.style.width=updatePanel.offsetWidth;
waitPanel.style.height=updatePanel.offsetHeight;
updatePanel.style.display = 'none';
if (ipjIsIE && !ipjIsIE9)
waitPanel.style.display = '';
else
waitPanel.style.display = 'table';
}
else
customWaitFunc();
var onServerResponse=function(objXMLHTTP)
{
if (objXMLHTTP.responseText.charAt(0) == 's')
{
var divider = objXMLHTTP.responseText.indexOf('[break]');
updatePanel.innerHTML=objXMLHTTP.responseText.substring(1, divider);
updatePanel.style.display = 'none';
var scriptToRun=objXMLHTTP.responseText.substring(divider+7);
if (scriptToRun && scriptToRun.length>0)
window.setTimeout(scriptToRun, 0);
window.setTimeout('document.getElementById(\'' + waitPanelID + '\').style.display = \'none\';', 1);
window.setTimeout('document.getElementById(\'' + containerID + '\').style.display = \'\';', 2);
if (onCallbackScript && onCallbackScript != '')
{
if (onCallbackScript.indexOf("=gridArgs;") > 0) {
onCallbackScript = onCallbackScript.replace("=gridArgs;", "='" + args + "';");
}
else if (onCallbackScript.indexOf(",gridArgs)") > 0) {
onCallbackScript = onCallbackScript.replace(",gridArgs)", ",'" + args + "')");
}
window.setTimeout(onCallbackScript, 3);
}
if (callbackFunc)
window.setTimeout(callbackFunc,4);
if (customCompleteFunc)
window.setTimeout(customCompleteFunc,5);
if (gridData)
window.setTimeout("runCellScripts('" + gridData.name + "');",10);
}
}
ipjDoXmlHttpRequest(callerID, document.forms['IronPointForm'].action, args, onServerResponse, "IPGridViewCallback");
}
function runCellScripts(gridDataName)
{
var gridData=eval(gridDataName);
for (var i=0; i<gridData.gridTable.rows.length; i++)
{
var objRow=gridData.gridTable.rows[i];
for (var j=objRow.cells.length-1; j>=0; j--)
{
var scriptArray = objRow.cells[j].getElementsByTagName('script');
if (scriptArray && scriptArray.length && Number(scriptArray.length)>0)
{
for (var k=0; k<Number(scriptArray.length); k++)
{
var script=scriptArray[k];
eval(script.text.replace('<!--','').replace('//-->',''));
}
}
}
}
}