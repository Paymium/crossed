import type { BaseWithState } from '@crossed/styled';

export const colorVariants: Record<string, BaseWithState<any>> = {
  slate: {
    ':light': { className: ['text-slate-800 border-slate-800 bg-slate-700'] },
    ':dark': { className: ['text-slate-500 border-slate-800 bg-slate-800'] },
    ':active': {
      ':light': { className: ['bg-slate-600'] },
      ':dark': { className: ['bg-slate-700'] },
    },
    ':hover': {
      ':light': { className: ['bg-slate-500'] },
      ':dark': { className: ['bg-slate-600'] },
    },
  },
  gray: {
    ':light': { className: ['text-gray-800 border-gray-800 bg-gray-700'] },
    ':dark': { className: ['text-gray-500 border-gray-800 bg-gray-800'] },
    ':active': { className: ['bg-gray-700'] },
    ':hover': { className: ['bg-gray-600'] },
  },
  zinc: {
    'className': ['border-zinc-800 bg-zinc-800'],
    ':light': { className: ['text-zinc-800'] },
    ':dark': { className: ['text-zinc-500'] },
    ':active': { className: ['bg-zinc-700'] },
    ':hover': { className: ['bg-zinc-600'] },
  },
  neutral: {
    'className': ['border-neutral-800 bg-neutral-800'],
    ':light': { className: ['text-neutral-800'] },
    ':dark': { className: ['text-neutral-500'] },
    ':active': { className: ['bg-neutral-700'] },
    ':hover': { className: ['bg-neutral-600'] },
  },
  stone: {
    'className': ['border-stone-800 bg-stone-800'],
    ':light': { className: ['text-stone-800'] },
    ':dark': { className: ['text-stone-500'] },
    ':active': { className: ['bg-stone-700'] },
    ':hover': { className: ['bg-stone-600'] },
  },
  red: {
    ':light': { className: ['text-red-700 border-red-700 bg-red-700'] },
    ':dark': { className: ['text-red-500 border-red-800 bg-red-800'] },
    ':active': {
      ':dark': { className: ['bg-red-700'] },
      ':light': { className: ['bg-red-600'] },
    },
    ':hover': {
      ':dark': { className: ['bg-red-600'] },
      ':light': { className: ['bg-red-500'] },
    },
  },
  orange: {
    'className': ['text-orange-800', 'border-orange-800', 'bg-orange-800'],
    ':active': { className: ['bg-orange-700'] },
    ':hover': { className: ['bg-orange-600'] },
  },
  amber: {
    'className': ['text-amber-800', 'border-amber-800', 'bg-amber-800'],
    ':active': { className: ['bg-amber-700'] },
    ':hover': { className: ['bg-amber-600'] },
  },
  yellow: {
    'className': ['text-yellow-800', 'border-yellow-800', 'bg-yellow-800'],
    ':active': { className: ['bg-yellow-700'] },
    ':hover': { className: ['bg-yellow-600'] },
  },
  lime: {
    'className': ['text-lime-800', 'border-lime-800', 'bg-lime-800'],
    ':active': { className: ['bg-lime-700'] },
    ':hover': { className: ['bg-lime-600'] },
  },
  green: {
    'className': ['text-green-800', 'border-green-800', 'bg-green-800'],
    ':active': { className: ['bg-green-700'] },
    ':hover': { className: ['bg-green-600'] },
  },
  emerald: {
    'className': ['text-emerald-800', 'border-emerald-800', 'bg-emerald-800'],
    ':active': { className: ['bg-emerald-700'] },
    ':hover': { className: ['bg-emerald-600'] },
  },
  teal: {
    'className': ['text-teal-800', 'border-teal-800', 'bg-teal-800'],
    ':active': { className: ['bg-teal-700'] },
    ':hover': { className: ['bg-teal-600'] },
  },
  cyan: {
    'className': ['text-cyan-800', 'border-cyan-800', 'bg-cyan-800'],
    ':active': { className: ['bg-cyan-700'] },
    ':hover': { className: ['bg-cyan-600'] },
  },
  sky: {
    'className': ['text-sky-800', 'border-sky-800', 'bg-sky-800'],
    ':active': { className: ['bg-sky-700'] },
    ':hover': { className: ['bg-sky-600'] },
  },
  blue: {
    'className': ['text-blue-500', 'border-blue-800', 'bg-blue-800'],
    ':active': { className: ['bg-blue-700'] },
    ':hover': { className: ['bg-blue-600'] },
  },
  indigo: {
    'className': ['text-indigo-500', 'border-indigo-800', 'bg-indigo-800'],
    ':active': { className: ['bg-indigo-700'] },
    ':hover': { className: ['bg-indigo-600'] },
  },
  violet: {
    'className': ['text-violet-500', 'border-violet-800', 'bg-violet-800'],
    ':active': { className: ['bg-violet-700'] },
    ':hover': { className: ['bg-violet-600'] },
  },
  purple: {
    'className': ['text-purple-500', 'border-purple-800', 'bg-purple-800'],
    ':active': { className: ['bg-purple-700'] },
    ':hover': { className: ['bg-purple-600'] },
  },
  fuchsia: {
    'className': ['text-fuchsia-500', 'border-fuchsia-800', 'bg-fuchsia-800'],
    ':active': { className: ['bg-fuchsia-700'] },
    ':hover': { className: ['bg-fuchsia-600'] },
  },
  pink: {
    'className': ['border-pink-800 bg-pink-800'],
    ':light': { className: ['text-pink-800'] },
    ':dark': { className: ['text-pink-500'] },
    ':active': { className: ['bg-pink-700'] },
    ':hover': { className: ['bg-pink-600'] },
  },
  rose: {
    'className': ['border-rose-800', 'bg-rose-800'],
    ':light': {
      className: ['text-rose-800 '],
    },
    ':dark': { className: ['text-rose-500'] },
    ':active': { className: ['bg-rose-700'] },
    ':hover': { className: ['bg-rose-600'] },
  },
};
