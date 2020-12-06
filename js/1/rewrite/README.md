# Day 1, rewrite 1

In [my first solution to problem 1](../one.js), my usual annoyance at the extra ceremony of having
to handle input streams callback style in Node.js pretty quickly gave way to a nice realization: the
solution can be interleaved with the line reading, so that you don't even need to read the whole
file to solve the problem. It's a proper streaming solution, so thanks Brendan Eich, Ryan Dahl, and
everyone else involved for the constraint! Whether this is actually faster over a small file like
this, well... probably not, given the overhead of the per-line IO. But we could now solve this
problem over a continuous stream of data, or over a dataset with lots of repeated or disqualified
(greater than 2019, since all inputs are posiitive integers) numbers and too large to realize in
memory at once.

So in this rewrite, I'll attempt to achieve the same streaming algorithm shape in a new solution for
the slightly more complicated second problem.

None of this matters with a file of 200 lines/numbers, of course, but what good is coding for fun
without a few arbitrary constraints here and there?

## Post-rewrite notes

Works! And reads more clearly to my eye too, though that may be the bias of having two solutions
under my belt now 😃.
