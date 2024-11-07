import * as React from 'react';
import { useAutocomplete, UseAutocompleteProps } from '@mui/base/useAutocomplete';
import { Button } from '@mui/base/Button';
import { Popper } from '@mui/base/Popper';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import clsx from 'clsx';

type AutocompleteProps<T extends unknown[]> = UseAutocompleteProps<T[number], false, false, false> & {
  name: string,
  placeholder: string,
  label: (option: T[number]) => React.ReactNode,
  onBlur?: () => void
}

function Autocomplete<T extends unknown[],>(
  props: AutocompleteProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    componentName: 'BaseAutocompleteIntroduction',
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={clsx(
          'flex gap-[5px] pr-[5px] overflow-hidden w-full rounded-lg bg-white border border-solid border-gray-200 hover:border-violet-400 focus-visible:outline-0 shadow',
          focused &&
            'shadow-md',
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
          name={props.name}
          className="text-foreground text-sm leading-[1.5] !shadow-none text-gray-900 bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto"
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="text-foreground self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 hover:cursor-pointer"
          >
            <ClearIcon className="translate-y-[2px] scale-90" />
          </Button>
        )}
        <Button
          {...getPopupIndicatorProps()}
          className="self-center text-foreground outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 hover:cursor-pointer"
        >
          <ArrowDropDownIcon
            className={clsx('translate-y-[2px] text-foreground', popupOpen && 'rotate-180')}
          />
        </Button>
      </div>
      {anchorEl && (
        <Popper
          onBlur={props.onBlur}
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: 'relative z-[1001] w-80', // z-index: 1001 is needed to override ComponentPageTabs with z-index: 1000
            },
          }}
          modifiers={[
            { name: 'flip', enabled: false },
            { name: 'preventOverflow', enabled: false },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0 min-w-[320px] rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] bg-white border border-solid text-foreground border-gray-200 text-gray-900 "
          >
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <li
                  {...optionProps}
                  key={index}
                  className="list-none text-foreground p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-violet-100 aria-selected:text-violet-900 ui-focused:bg-gray-100 ui-focus-visible:bg-gray-100 ui-focused:text-gray-900 ui-focus-visible:text-gray-900 ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-violet-200 ui-focused:aria-selected:bg-violet-100 ui-focus-visible:aria-selected:bg-violet-100 ui-focused:aria-selected:text-violet-900 ui-focus-visible:aria-selected:text-violet-900 dark:ui-focus-visible:aria-selected:text-violet-100"
                >
                  {props.getOptionLabel!(option)}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="list-none p-2 cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      )}
    </React.Fragment>
  );
}

export {
  Autocomplete
}