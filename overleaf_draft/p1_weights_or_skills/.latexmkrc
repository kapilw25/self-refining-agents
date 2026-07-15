# LOCAL build config. Routes ALL latexmk output (pdf, aux, log, fls, fdb_latexmk, out, blg, bbl,
# synctex) into no_upload/build/, so this paper folder's top level stays SOURCE-ONLY and manual
# Overleaf upload never picks up build junk.
#
# DO NOT upload this file to Overleaf: $out_dir would send output to no_upload/build/, which is not
# part of the Overleaf project, and can break Overleaf's PDF preview. Overleaf keeps its own build
# artifacts invisibly, so it does not need this file. It is committed to GitHub only as a local
# convenience; skip it when uploading folders to Overleaf.
$out_dir  = 'no_upload/build';
$pdf_mode = 1;
