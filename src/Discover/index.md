## Discover

Demo:

```tsx
import React from 'react';
import { DYDiscover } from 'dy-ploto';
const data =
  '[{"data":{"shape":"roundrectangle","value":1000,"color":"#8caebd","textsize":"30px","borderwidth":"1px","oriname":"Release A","name":"\u5199\u51652-4\u4f4f\u6240\u7c7b\u578b\\n8360/8362(99%)","textcolor":"black","width":"300px","id":0,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"ellipse","value":0,"color":"#C1C9B0","textsize":"16px","borderwidth":"1px","oriname":"|>","name":"\u6237\u4e3b\u4fe1\u606f-\u59d3\u540d\\n3","textcolor":"black","width":"25px","id":1,"textwidth":"155px","height":"25px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#bdd5de","textsize":"16px","borderwidth":"1px","oriname":"Return ER","name":"Return ER\\n\\n294","textcolor":"black","width":"160px","id":2,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#789faf","textsize":"16px","borderwidth":"1px","oriname":"IV Antibiotics","name":"IV Antibiotics\\n\\n823","textcolor":"white","width":"160px","id":3,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#608c9e","textsize":"16px","borderwidth":"1px","oriname":"Leucocytes","name":"Leucocytes\\n\\n1012","textcolor":"white","width":"160px","id":4,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":10000,"color":"#e0f0f6","textsize":"16px","borderwidth":"1px","oriname":"Release C","name":"Release C\\n\\n25","textcolor":"black","width":"160px","id":5,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"ellipse","value":0,"color":"#C0A3A1","textsize":"16px","borderwidth":"3px","oriname":"[]","name":"E","textcolor":"black","width":"25px","id":6,"textwidth":"155px","height":"25px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#7ba1b1","textsize":"16px","borderwidth":"1px","oriname":"Admission NC","name":"Admission NC\\n\\n800","textcolor":"white","width":"160px","id":7,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#749bac","textsize":"16px","borderwidth":"1px","oriname":"LacticAcid","name":"LacticAcid\\n\\n860","textcolor":"white","width":"160px","id":8,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#d5e7ef","textsize":"16px","borderwidth":"1px","oriname":"Admission IC","name":"Admission IC\\n\\n110","textcolor":"black","width":"160px","id":9,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#dcedf4","textsize":"16px","borderwidth":"1px","oriname":"Release B","name":"Release B\\n\\n56","textcolor":"black","width":"160px","id":10,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#e0f0f6","textsize":"16px","borderwidth":"1px","oriname":"Release D","name":"Release D\\n\\n24","textcolor":"black","width":"160px","id":11,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#e2f2f8","textsize":"16px","borderwidth":"1px","oriname":"Release E","name":"Release E\\n\\n6","textcolor":"black","width":"160px","id":12,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Triage","name":"ER Triage\\n\\n1050","textcolor":"white","width":"160px","id":13,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Registration","name":"ER Registration\\n\\n1050","textcolor":"white","width":"160px","id":14,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#81a6b5","textsize":"16px","borderwidth":"1px","oriname":"IV Liquid","name":"IV Liquid\\n\\n753","textcolor":"white","width":"160px","id":15,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#618c9f","textsize":"16px","borderwidth":"1px","oriname":"CRP","name":"CRP\\n\\n1007","textcolor":"white","width":"160px","id":16,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"shape":"roundrectangle","value":1000,"color":"#5b889b","textsize":"16px","borderwidth":"1px","oriname":"ER Sepsis Triage","name":"ER Sepsis Triage\\n\\n1049","textcolor":"white","width":"160px","id":17,"textwidth":"155px","height":"70px"}},' +
  '{"data":{"strength":50.201612903225815,"color":"#568294","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":15,"label":"501","point-weights":"0.5","target":3}},' +
  '{"data":{"strength":97.58064516129032,"color":"#476a78","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":14,"label":"971","point-weights":"0.5","target":13}},' +
  '{"data":{"strength":90.92741935483872,"color":"#496e7c","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":13,"label":"905","point-weights":"0.5","target":17}},' +
  '{"data":{"strength":0.20161290322580644,"color":"#646464","point-distances":"15.40","edge-style":"unbundled-bezier","style":"dashed","source":12,"label":"5","point-weights":"0.56","target":6}},' +
  '{"data":{"strength":4.334677419354839,"color":"#669aaf","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":3,"label":"46","point-weights":"0.5","target":9}},' +
  '{"data":{"strength":1.6129032258064515,"color":"#646464","point-distances":"3.40","edge-style":"unbundled-bezier","style":"dashed","source":5,"label":"19","point-weights":"0.57","target":6}},' +
  '{"data":{"strength":0.9072580645161291,"color":"#679cb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"12","point-weights":"0.5","target":11}},' +
  '{"data":{"strength":48.99193548387097,"color":"#578395","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":3,"label":"489","point-weights":"0.5","target":7}},' +
  '{"data":{"strength":100,"color":"#646464","point-distances":"0","edge-style":"unbundled-bezier","style":"dashed","source":1,"label":"995","point-weights":"0.5","target":14}},' +
  '{"data":{"strength":1.6129032258064515,"color":"#669bb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"19","point-weights":"0.5","target":10}},' +
  '{"data":{"strength":0,"color":"#679cb2","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"3","point-weights":"0.5","target":12}},' +
  '{"data":{"strength":3.7298387096774195,"color":"#669ab0","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":9,"label":"40","point-weights":"0.5","target":8}},' +
  '{"data":{"strength":1.1088709677419355,"color":"#646464","point-distances":"8.11","edge-style":"unbundled-bezier","style":"dashed","source":11,"label":"14","point-weights":"0.57","target":6}},' +
  '{"data":{"strength":32.15725806451613,"color":"#5c8c9f","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"322","point-weights":"0.5","target":0}},' +
  '{"data":{"strength":29.03225806451613,"color":"#646464","point-distances":"0","edge-style":"unbundled-bezier","style":"dashed","source":2,"label":"291","point-weights":"0.5","target":6}},' +
  '{"data":{"strength":36.59274193548387,"color":"#5b899c","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":8,"label":"366","point-weights":"0.5","target":4}},' +
  '{"data":{"strength":28.42741935483871,"color":"#5e8ea1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":17,"label":"285","point-weights":"0.5","target":15}},' +
  '{"data":{"strength":1.0080645161290323,"color":"#679bb1","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":16,"label":"13","point-weights":"0.5","target":5}},' +
  '{"data":{"strength":27.52016129032258,"color":"#5e8ea2","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":0,"label":"276","point-weights":"0.5","target":2}},' +
  '{"data":{"strength":76.10887096774194,"color":"#4e7585","point-distances":"0","edge-style":"unbundled-bezier","style":"solid","source":4,"label":"758","point-weights":"0.5","target":16}},' +
  '{"data":{"strength":5.241935483870968,"color":"#646464","point-distances":"3.32","edge-style":"unbundled-bezier","style":"dashed","source":10,"label":"55","point-weights":"0.58","target":6}},' +
  '{"data":{"strength":36.693548387096776,"color":"#5b899c","point-distances":"11.87","edge-style":"unbundled-bezier","style":"solid","source":7,"label":"367","point-weights":"0.50","target":4}}]'


export default () => <DYDiscover data={data}/>;
```

