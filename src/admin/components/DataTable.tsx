import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  filterComponent?: React.ReactNode;
  actionComponent?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  onEmptyAction?: () => void;
  emptyActionLabel?: string;
  pageSize?: number;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filterComponent,
  actionComponent,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items to display matching your criteria.',
  onEmptyAction,
  emptyActionLabel,
  pageSize = 10
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim() || !searchFilter) return data;
    return data.filter((item) => searchFilter(item, searchQuery.trim()));
  }, [data, searchQuery, searchFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="space-y-3.5">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          {searchFilter && (
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-600 text-white pl-9 pr-3.5 py-2 rounded-lg text-xs focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>
          )}
          {filterComponent}
        </div>

        {actionComponent && <div className="flex items-center gap-2">{actionComponent}</div>}
      </div>

      {/* Table Container */}
      <div className="bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-850 bg-neutral-900/60 text-neutral-400 uppercase tracking-wider font-semibold text-[11px]">
                  {columns.map((col, idx) => (
                    <th key={idx} className={`py-3 px-4 ${col.headerClassName || ''}`}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850/80">
                {paginatedData.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    className="hover:bg-neutral-900/40 transition-colors group"
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className={`py-3.5 px-4 text-neutral-200 ${col.className || ''}`}>
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer / Pagination */}
        {filteredData.length > 0 && (
          <div className="p-3.5 px-4 border-t border-neutral-850 bg-neutral-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <div>
              Showing <span className="text-white font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="text-white font-medium">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </span>{' '}
              of <span className="text-white font-medium">{filteredData.length}</span> records
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded bg-neutral-900 border border-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2.5 py-1 text-[11px] font-mono font-semibold text-neutral-300">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded bg-neutral-900 border border-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
