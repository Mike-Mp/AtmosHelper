import * as icons from './navImports';

const navLinks = [
   {
       pathname: "/home",
       icons: [icons.homeIcon, icons.homeIconBlue, icons.homeIconWhite]
   },
    {
       pathname: "/settings",
       icons: [icons.settingsIcon, icons.settingsIconBlue, icons.settingsIconWhite]
   },
   {
       pathname: "/storage/1?brand=all",
       icons: [icons.storageIcon, icons.storageIconBlue, icons.storageIconWhite]
   },
   {
       pathname: "/about",
       icons: [icons.infoIcon, icons.infoIconBlue, icons.infoIconWhite]
   },
   
]; 

const dropDownLinks = [
    {
       pathname: "/ohm",
       icons: [icons.ohmIcon, icons.ohmIconBlue, icons.ohmIconWhite],
       title: "Ohm's Law"
   },
   {
       pathname: "/nic",
       icons: [icons.euroIcon, icons.euroIconBlue, icons.euroIconWhite],
       title: "Nicotine Cost"
   },
   {
       pathname: "/oneshots",
       icons: [icons.bottleIcon, icons.bottleIconBlue, icons.bottleIconWhite],
       title: "Oneshots"
   },
]

export {navLinks, dropDownLinks};
