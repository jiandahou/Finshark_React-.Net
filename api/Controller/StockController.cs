using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace api.Controller
{
    [Route("api/stock")]
    [ApiController]
    public class StockController:ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly IstockRepository _stockRepo;
        public StockController(ApplicationDBcontext context, IstockRepository stockRepo)
        {
            _context=context;
            _stockRepo=stockRepo;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stocks = await _stockRepo.GetAllAsync(query);
            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();
            return Ok(stockDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByID([FromRoute] int id){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stock= await _stockRepo.GetByIdAsync(id);
            if(stock==null){
                return NotFound();
            }
            else{
                return Ok(stock.ToStockDto());
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequest stockDto){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stockModel=stockDto.ToStockFromCreateDTO();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetByID),new {id=stockModel.Id},stockModel.ToStockDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id,[FromBody] UpdateStockRequestDto updateDto){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stockModel=await _stockRepo.UpdateAsync(id,updateDto);
            if(stockModel==null){
                return NotFound();
            }
            await _context.SaveChangesAsync();
            return Ok(stockModel.ToStockDto());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult>  Delete([FromRoute] int id){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stockModel= await _stockRepo.DeleteAsync(id);
            if(stockModel==null){
                return NotFound();
            }
            return NoContent();

        }
    }
}