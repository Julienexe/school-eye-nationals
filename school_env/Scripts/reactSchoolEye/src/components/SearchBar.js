import React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BiDotsVertical, BiRightArrowAlt } from 'react-icons/bi';
import { useGlobalContext } from '../context/appContext';

const SearchBar = () => {
  const { Schools, displaySchools } = useGlobalContext();
  const filterObject = { searchBar: '', range: 0, region: '' };
  const [filterBtns, setFilterBtns] = useState(filterObject);
  let filteredSchools = [];
  const handleFilterChange = (e) => {
    const value = e.target.value;
    let objKey = e.target.name;
    setFilterBtns((currValues) => {
      return { ...currValues, [objKey]: value };
    });
    if (objKey === 'searchBar') {
      filteredSchools = [
        ...Schools.filter((school) => {
          if (school.name.includes(value)) {
            return school;
          }
          return;
        }),
      ];
      displaySchools(filteredSchools);
      return;
    }
    if (objKey === 'range') {
      filteredSchools = [
        ...Schools.filter((school) => {
          if (school.coverage >= value) {
            return school;
          }
          return;
        }),
      ];
      displaySchools(filteredSchools);
      return;
    }
    if (objKey === 'region' && value === 'all') {
      filteredSchools = Schools;
      displaySchools(filteredSchools);
      return;
    }
    filteredSchools = Schools.filter((school) => school[objKey] === value);
    displaySchools(filteredSchools);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterBtns.searchBar) {
      filteredSchools = [
        ...Schools.filter((school) =>
          school.name.includes(filterBtns.searchBar)
        ),
      ];
      console.log(filteredSchools);
    }
    if (filterBtns.range) {
      filteredSchools = [
        ...Schools.filter((school) => {
          if (school.coverage <= filterBtns.range) {
            return school;
          }
          return;
        }),
      ];
    }
    if (filterBtns.region) {
      filteredSchools = [
        ...Schools.filter((school) => {
          if (school.region === filterBtns.region) {
            return school;
          }
          return;
        }),
      ];
    }
    displaySchools(filteredSchools);
  };
  return (
    <section>
      <form onSubmit={handleSubmit} className='filter-form'>
        <div className='merge-input'>
          <FaSearch className='search-icon' />
          <input
            type='search'
            name='searchBar'
            id='search'
            placeholder='search institution'
            value={filterBtns.searchBar}
            onChange={handleFilterChange}
          />
          <BiDotsVertical className='merge-icon' />
          <select
            name='region'
            value={filterBtns.region}
            onChange={handleFilterChange}
          >
            <option value='all'>All</option>
            <option value='central'>Central</option>
            <option value='western'>Western</option>
            <option value='eastern'>Eastern</option>
            <option value='northern'>Northern</option>
          </select>
          <button type='submit' className='search-icon enter-btn'>
            <BiRightArrowAlt />
          </button>
        </div>
        <div className='range'>
          <label htmlFor='range'>
            Coverage range
            <BiDotsVertical className='colon' />
            {filterBtns.range}%
          </label>
          <input
            type='range'
            name='range'
            id='range'
            min='0'
            max='100'
            value={filterBtns.range}
            onChange={handleFilterChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
