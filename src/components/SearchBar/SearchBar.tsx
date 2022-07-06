import { Stack, TextField } from "@mui/material";

function SearchBar({ onChange } : { onChange : Function }){

    function onSearchInput(e : React.ChangeEvent<HTMLInputElement>){
        onChange && onChange(e.target.value)
    }
    return <Stack><TextField onChange={onSearchInput} label="Search" variant="filled" /></Stack>
}

export default SearchBar;