import * as icons from './navImports';

const navLinks = [
   {
       pathname: "/",
       icons: [icons.homeIcon, icons.homeIconBlue]
   },
    {
       pathname: "/settings",
       icons: [icons.settingsIcon, icons.settingsIconBlue]
   },
   {
       pathname: "/about",
       icons: [icons.infoIcon, icons.infoIconBlue]
   },
   
]; 

const dropDownLinks = [
    {
       pathname: "/ohm",
       icons: [icons.ohmIcon, icons.ohmIconBlue],
       title: "Ohm's Law"
   },
   {
       pathname: "/nic",
       icons: [icons.euroIcon, icons.euroIconBlue],
       title: "Nicotine Cost"
   },
   {
       pathname: "/oneshots",
       icons: [icons.bottleIcon, icons.bottleIconBlue],
       title: "Oneshots"
   },
]

export {navLinks, dropDownLinks};