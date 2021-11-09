<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * @param Request $request Description of the argument.
     * @param EloquentBuilder|QueryBuilder $query Description of the argument.
     */
    public function __construct($request,  $query)
    {
        $this->limit = $request->limit ?? 15;
        $this->page = $request->page ?? 1;
        $this->search = $request->search ?? "";
        $this->replacedItems = null;
        $this->query = $query;
    }

    public function getLimit()
    {
        return $this->limit;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function getSearch()
    {
        return $this->search;
    }

    public function getOffset()
    {
        return $this->limit * ($this->page - 1);
    }

    public function addWhere(
        $column,
        $operator = null,
        $value = null
    ) {
        $this->query->where($column, $operator, $value);
        return $this;
    }

    public function orderBy($column, $direction = 'asc')
    {
        $this->query->orderBy($column, $direction);
        return $this;
    }

    public function get()
    {
        $cloneQuery = clone ($this->query);
        return $cloneQuery->limit($this->getLimit())->offset($this->getOffset())->get();
    }

    public function replaceItems($newItems)
    {
        $this->replacedItems = $newItems;
    }

    public function getResults()
    {
        return [
            "total" => $this->query->get()->count(),
            "count" => $this->query->limit($this->getLimit())->offset($this->getOffset())->get()->count(),
            "items" => $this->replacedItems ?? $this->query->limit($this->getLimit())->offset($this->getOffset())->get(),
        ];
    }
}